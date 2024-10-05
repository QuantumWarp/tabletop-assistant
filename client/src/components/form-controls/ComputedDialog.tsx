import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { parse, SymbolNode } from 'mathjs';
import { Expression, ExpressionVariable } from '@tabletop-assistant/common';
import ComputedInputRow from './ComputedInputRow';

interface ComputedDialogProps {
  includeTarget?: boolean;
  initialTarget?: Omit<ExpressionVariable, 'key'>;
  initialExpression?: Expression;
  open: boolean;
  onSave: (expression: Expression, target?: Omit<ExpressionVariable, 'key'>) => void;
  onDelete: () => void;
  onClose: () => void;
}

const ComputedDialog = ({
  includeTarget, initialTarget, initialExpression, open, onSave, onDelete, onClose,
}: ComputedDialogProps) => {
  const [target, setTarget] = useState(initialTarget);
  const [expression, setExpression] = useState(initialExpression?.expression || '');
  const [variables, setVariables] = useState<ExpressionVariable[]>(
    initialExpression?.variables || [],
  );

  let expressionValid = true;
  const expressionSymbols: string[] = [];
  try {
    const rootNode = parse(expression);
    const symbols = rootNode.filter((node) => node.type === 'SymbolNode') as SymbolNode[];
    expressionSymbols.push(...symbols.map((x) => x.name));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    expressionValid = false;
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initialTarget ? 'Update ' : 'Create '}
          {includeTarget ? 'Macro' : 'Expression'}
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          {includeTarget && (
            <ComputedInputRow
              name="Target"
              value={target && { key: 'Target', ...target }}
              onChange={(newExpression) => setTarget(newExpression)}
            />
          )}

          <Grid item xs={12}>
            <TextField
              error={!expressionValid}
              helperText={!expressionValid && 'Expression Invalid'}
              fullWidth
              required
              autoFocus
              label="Expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
          </Grid>

          {expressionSymbols.map((variable) => (
            <ComputedInputRow
              key={variable}
              name={variable}
              value={variables.find((x) => x.key === variable)}
              onChange={(newExpression) => setVariables(variables
                .filter((x) => x.key !== variable)
                .concat([newExpression]))}
            />
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        {initialExpression && (
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => { onDelete(); onClose(); }}
          >
            Delete
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => onSave({ expression, variables }, target)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ComputedDialog.defaultProps = {
  includeTarget: false,
  initialTarget: undefined,
  initialExpression: undefined,
};

export default ComputedDialog;
