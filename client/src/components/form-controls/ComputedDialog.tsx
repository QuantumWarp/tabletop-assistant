import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { parse, SymbolNode } from 'mathjs';
import { Expression, ExpressionVariable } from 'tabletop-assistant-common';
import { useGetEntitiesQuery } from '../../store/api';

interface ComputedDialogProps {
  initial: Expression;
  open: boolean;
  onSave: (expression: Expression) => void;
  onDelete: () => void;
  onClose: () => void;
}

const ComputedDialog = ({
  initial, open, onSave, onDelete, onClose,
}: ComputedDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [expression, setExpression] = useState(initial?.expression || '');
  const [variables, setVariables] = useState<ExpressionVariable[]>(
    initial?.variables || {},
  );

  let expressionValid = true;
  const expressionSymbols: string[] = [];
  try {
    const rootNode = parse(expression);
    const symbols = rootNode.filter((node) => node.type === 'SymbolNode') as SymbolNode[];
    expressionSymbols.push(...symbols.map((x) => x.name));
  } catch (err) {
    expressionValid = false;
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          Computed Expression
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
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

          {expressionSymbols.map((variable) => {
            const variableRef: ExpressionVariable | undefined = variables
              .find((x) => x.key === variable);
            const entity = entities?.find((x) => x._id === variableRef?.entityId);

            return (
              <>
                <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                  <b>{variable}</b>
                </Grid>

                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel>Entity</InputLabel>
                    <Select
                      label="Entity"
                      MenuProps={{ style: { maxHeight: '400px' } }}
                      value={variableRef?.entityId}
                      onChange={(e) => setVariables({
                        ...variables,
                        [variable]: {
                          ...variableRef,
                          entityId: e.target.value,
                        },
                      })}
                    >
                      {entities?.map((x) => (
                        <MenuItem key={x._id} value={x._id}>
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel>Field</InputLabel>
                    <Select
                      label="Field"
                      MenuProps={{ style: { maxHeight: '400px' } }}
                      value={variableRef?.fieldKey}
                      onChange={(e) => setVariables({
                        ...variables,
                        [variable]: {
                          ...variableRef,
                          fieldKey: e.target.value,
                        },
                      })}
                    >
                      {entity?.fields?.map((x) => (
                        <MenuItem key={x.key} value={x.key}>
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.expression && (
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
          onClick={() => onSave({ expression, variables })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComputedDialog;
