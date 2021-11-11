import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Redo } from '@mui/icons-material';
import RollCombo, { RollComboHelper } from '../../../models/rolling/roll-combo';
import './ActionRollResultDialog.css';

interface ActionRollResultDialogProps {
  combo: RollCombo;
  open: boolean;
  onClose: (updatedCombo?: RollCombo) => void;
}

const ActionRollResultDialog = ({ combo, open, onClose }: ActionRollResultDialogProps) => {
  const [updatedResult, setUpdatedResult] = useState(RollComboHelper.clone(combo, true));

  const staticResults = updatedResult.filter((x) => x.static);
  const nonStaticResults = updatedResult.filter((x) => !x.static);

  const rerollEntry = (entryId: string) => {
    const entryIndex = updatedResult.findIndex((x) => x.id === entryId);
    if (entryIndex === -1) return;
    const entry = updatedResult[entryIndex];
    const newEntry = RollComboHelper.rollSingle(entry);
    const newResult = [...updatedResult];
    newResult[entryIndex] = newEntry;
    setUpdatedResult(newResult);
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Edit Roll</b>
      </DialogTitle>

      <DialogContent className="action-roll-result-dialog">
        <div className="total">
          Total
          {': '}
          {RollComboHelper.totalValue(updatedResult)}
        </div>

        <div className="results">
          <div className="result">
            <span className="top" />
            <span className="static">{RollComboHelper.totalValue(staticResults)}</span>
            <span className="detail">Static</span>
          </div>

          {nonStaticResults.map((x) => (
            <React.Fragment key={x.id}>
              <span className="sign">{x.negative ? '-' : '+'}</span>

              <div
                key={x.id}
                className="result"
                onClick={() => rerollEntry(x.id)}
              >
                <span className="top">{x.previous && <Redo />}</span>

                <span className={`${x.result === 1 ? ' min' : ''}${x.result === x.faces ? ' max' : ''}`}>
                  {x.result}
                </span>

                <span className="detail">
                  d
                  {x.faces}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => onClose(updatedResult)} variant="outlined">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionRollResultDialog;
