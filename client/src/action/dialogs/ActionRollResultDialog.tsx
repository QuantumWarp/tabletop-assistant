import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Redo } from '@mui/icons-material';
import './ActionRollResultDialog.css';
import { RollResult, RollResultDie } from 'tabletop-assistant-common';
import RollHelper from '../../helpers/roll.helper';

interface ActionRollResultDialogProps {
  result: RollResult;
  open: boolean;
  onClose: (updatedResult?: RollResult) => void;
}

const ActionRollResultDialog = ({ result, open, onClose }: ActionRollResultDialogProps) => {
  const [updatedResult, setUpdatedResult] = useState(result);

  const staticResults = updatedResult.filter((x) => x.static);
  const nonStaticResults = updatedResult.filter((x) => !x.static);

  const rerollEntry = (entry: RollResultDie) => {
    const newEntry = RollHelper.rollSingleDie(entry);
    const newResult = [...updatedResult];
    const entryIndex = updatedResult.findIndex((x) => x === entry);
    newResult[entryIndex] = newEntry;
    setUpdatedResult(newResult);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Edit Roll</b>
      </DialogTitle>

      <DialogContent className="action-roll-result-dialog">
        <div className="total">
          Total
          {': '}
          {RollHelper.totalValue(updatedResult)}
        </div>

        <div className="results">
          <div className="result">
            <span className="top" />
            <span className="static">{RollHelper.totalValue(staticResults)}</span>
            <span className="detail">Static</span>
          </div>

          {nonStaticResults.map((x) => (
            <>
              <span className="sign">{x.negative ? '-' : '+'}</span>

              <div
                className="result"
                onClick={() => rerollEntry(x)}
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
            </>
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
