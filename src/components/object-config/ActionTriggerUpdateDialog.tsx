import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useAppSelector } from '../../store/store';
import { selectActions, selectGameObjects } from '../../store/configuration-slice';
import ActionTrigger from '../../models/objects/action-trigger';

interface ActionUpdateDialogProps {
  trigger?: Partial<ActionTrigger>;
  open: boolean;
  onDelete: () => void;
  onClose: (trigger?: ActionTrigger) => void;
}

const ActionUpdateDialog = ({
  trigger = {}, open, onDelete, onClose,
}: ActionUpdateDialogProps) => {
  const gameActions = useAppSelector(selectActions);
  const gameObjects = useAppSelector(selectGameObjects);

  const [actionId, setActionId] = useState(trigger.actionId || '');
  const [manual, setManual] = useState(trigger.manual);
  const [sibling, setSibling] = useState(trigger.sibling);

  const saveTrigger = () => {
    const updatedTrigger = {
      actionId,
      manual,
      sibling,
    };
    onClose(updatedTrigger);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        {(trigger.actionId || trigger.manual) ? 'Update ' : 'Create '}
        Action
      </DialogTitle>

      <DialogContent>
        <Select
          fullWidth
          label="Action"
          variant="standard"
          value={actionId}
          onChange={(e) => setActionId(e.target.value)}
        >
          {gameActions.map((act) => {
            const obj = gameObjects.find((x) => x.id === act.objectId);
            return (
              <MenuItem key={act.id} value={act.id}>
                {obj?.name}
                {' - '}
                {act.name}
              </MenuItem>
            );
          })}
        </Select>

        <FormControlLabel control={<Checkbox value={manual} onChange={(e) => setManual(e.target.checked)} />} label="Manual" />

        <FormControlLabel control={<Checkbox value={sibling} onChange={(e) => setSibling(e.target.checked)} />} label="Sibling" />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => { onDelete(); onClose(); }} color="error" variant="outlined">
          Delete
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveTrigger} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ActionUpdateDialog.defaultProps = {
  trigger: {},
};

export default ActionUpdateDialog;
