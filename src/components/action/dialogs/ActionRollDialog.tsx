import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Note from '../../../models/notes/note';
import { useAppSelector } from '../../../store/store';
import { selectActions } from '../../../store/config-slice';
import RollCombo, { RollComboHelper } from '../../../models/rolling/roll-combo';
import GameAction from '../../../models/objects/game-action';
import './ActionRollDialog.css';

const FaceCombo = (combo: RollCombo) => (
  <div
    key={combo.map((entry) => entry.id).join(',')}
    className="face-combo"
  >
    {combo.length}
    d
    {combo[0].faces}
  </div>
);

const ActionCombo = (combo: RollCombo, action?: GameAction) => {
  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + x.faces, 0);
  const faceComboDict = RollComboHelper.groupByFaces(combo.filter((x) => !x.static));

  return (
    <div
      key={combo.map((entry) => entry.id).join(',')}
      className="action-combo"
    >
      <span>{ action?.name || 'Custom' }</span>

      <div className="face-combos">
        <span>{staticValue}</span>
        {Object.keys(faceComboDict).map((x) => (
          FaceCombo(faceComboDict[Number(x)])
        ))}
      </div>
    </div>
  );
};

interface ActionRollDialogProps {
  combo: RollCombo;
  open: boolean;
  onClose: (note?: Note) => void;
}

const ActionRollDialog = ({ combo, open, onClose }: ActionRollDialogProps) => {
  const gameActions = useAppSelector(selectActions);

  const actionComboDict = RollComboHelper.groupByActionId(combo);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        Setup Roll
      </DialogTitle>

      <DialogContent>
        {Object.keys(actionComboDict).map((actionId) => {
          const actionCombo = actionComboDict[actionId];
          const action = gameActions.find((x) => x.id === actionId);
          return ActionCombo(actionCombo, action);
        })}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Apply
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Roll Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionRollDialog;
