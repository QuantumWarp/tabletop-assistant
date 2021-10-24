import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import Note from '../../models/notes/note';
import { useAppSelector } from '../../store/store';
import { selectActions } from '../../store/configuration-slice';
import RollCombo, { RollComboHelper } from '../../models/rolling/roll-combo';
import GameAction from '../../models/objects/game-action';

const ActionCombo = (combo: RollCombo, action?: GameAction) => (
  <div>
    Action:
    {action?.name}
  </div>
);

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
