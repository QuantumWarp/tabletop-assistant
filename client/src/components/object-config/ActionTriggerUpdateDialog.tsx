import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useAppSelector } from '../../store/store';
import { selectActions, selectObjects } from '../../store/config-slice';
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
  const actions = useAppSelector(selectActions);
  const objects = useAppSelector(selectObjects);

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
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {(trigger.actionId || trigger.manual) ? 'Update ' : 'Create '}
          Trigger
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Action</InputLabel>
              <Select
                fullWidth
                label="Action"
                value={actionId}
                onChange={(e) => setActionId(e.target.value)}
              >
                {actions.map((act) => {
                  const obj = objects.find((x) => x.id === act.objectId);
                  return (
                    <MenuItem key={act.id} value={act.id}>
                      {obj?.name}
                      {' - '}
                      {act.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              label="Manual"
              control={(
                <Checkbox
                  value={manual}
                  onChange={(e) => setManual(e.target.checked)}
                />
                )}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              label="Sibling"
              control={(
                <Checkbox
                  value={sibling}
                  onChange={(e) => setSibling(e.target.checked)}
                />
                )}
            />
          </Grid>
        </Grid>
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
