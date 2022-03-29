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
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { EntityActionTrigger } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import { useGetEntitiesQuery } from '../../store/api';

interface EditActionTriggerDialogProps {
  initial?: Partial<EntityActionTrigger>;
  open: boolean;
  onClose: (deleted?: boolean) => void;
  onSave: (action: EntityActionTrigger) => void;
}

const EditActionTriggerDialog = ({
  initial, open, onClose, onSave,
}: EditActionTriggerDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [manual, setManual] = useState(initial?.manual || false);
  const [sibling, setSibling] = useState(initial?.sibling || false);
  const [entityId, setEntityId] = useState(initial?.entityId);
  const [actionKey, setActionKey] = useState(initial?.actionKey);

  const entity = entityId && entities?.find((x) => x._id === entityId);

  const saveTrigger = () => {
    const updatedProps = {
      manual,
      sibling,
      entityId,
      actionKey,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.manual !== undefined ? 'Update ' : 'Create '}
          Action
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControlLabel
              label="Manual"
              control={(
                <Checkbox
                  checked={manual}
                  onChange={(e) => setManual(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Sibling"
              control={(
                <Checkbox
                  checked={sibling}
                  onChange={(e) => setSibling(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Entity</InputLabel>
              <Select
                label="Icon"
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
              >
                {entities && entities.map((x) => (
                  <MenuItem
                    key={x._id}
                    value={x._id}
                  >
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Action</InputLabel>
              <Select
                label="Icon"
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={actionKey}
                onChange={(e) => setActionKey(e.target.value)}
              >
                {entity && entity.actions.map((x) => (
                  <MenuItem
                    key={x.key}
                    value={x.key}
                  >
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.manual !== undefined && (
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => onClose(true)}
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
          onClick={() => saveTrigger()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditActionTriggerDialog.defaultProps = {
  initial: {},
};

export default EditActionTriggerDialog;
