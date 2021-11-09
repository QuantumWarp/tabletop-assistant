import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Note from '../../../models/notes/note';
import RollCombo, { RollComboHelper } from '../../../models/rolling/roll-combo';
import './ActionRollDialog.css';

interface ActionRollResultDialogProps {
  combo: RollCombo;
  open: boolean;
  onClose: (note?: Note) => void;
}

const ActionRollResultDialog = ({ combo, open, onClose }: ActionRollResultDialogProps) => {
  const staticResults = combo.filter((x) => x.static);
  const nonStaticResults = combo.filter((x) => !x.static);

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Roll
      </DialogTitle>

      <DialogContent>
        <span className="total">{RollComboHelper.totalValue(combo)}</span>
        <span className="static">{RollComboHelper.totalValue(staticResults)}</span>
        {nonStaticResults.map((x) => (
          <span
            key={x.id}
            className="combo"
          >
            <span className="sign">+</span>
            <span
              className={`result${x.result === 1 ? ' lowest' : ''}${x.result === x.faces ? ' highest' : ''}`}
              title={`A ${x.result} was rolled on a d${x.faces}`}
            >
              {x.result}
            </span>
          </span>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionRollResultDialog;
