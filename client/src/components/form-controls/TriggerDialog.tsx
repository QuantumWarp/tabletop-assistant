import React, { useEffect, useState } from 'react';
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
import {
  CreateEntity, EntityActionTrigger, UpdateEntity,
} from '@/common';
import { useParams } from 'react-router-dom';
import { useGetEntitiesQuery } from '../../store/api';

interface TriggerDialogProps {
  initial?: Partial<EntityActionTrigger>;
  entity: CreateEntity | UpdateEntity;
  open: boolean;
  onSave: (action: EntityActionTrigger) => void;
  onDelete: () => void;
  onClose: () => void;
}

const TriggerDialog = ({
  initial, entity, open, onSave, onDelete, onClose,
}: TriggerDialogProps) => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [manual, setManual] = useState(initial?.manual || false);
  const [sibling, setSibling] = useState(initial?.sibling || false);
  const [entityId, setEntityId] = useState(initial?.entityId);
  const [actionKey, setActionKey] = useState(initial?.actionKey);

  const currentEntity = { ...entity, _id: '-', name: `${entity.name} (Current)` };
  const sortedEntities = entities
    ?.filter((x) => x._id !== (entity as UpdateEntity)._id)
    .sort((a, b) => a.name.localeCompare(b.name));
  const entitySelection = [currentEntity].concat(sortedEntities || []);

  const selectedEntity = entitySelection.find((x) => x._id === entityId);

  const actionSelection = selectedEntity?.actions;

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

  useEffect(() => {
    if (!actionSelection?.find((x) => x.key === actionKey)) {
      setActionKey(undefined);
    }
  }, [selectedEntity, actionSelection, actionKey]);

  useEffect(() => {
    if (!manual) return;
    setSibling(false);
    setEntityId('');
    setActionKey('');
  }, [manual]);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {(initial?.manual !== undefined || initial?.entityId !== undefined) ? 'Update ' : 'Create '}
          Trigger
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
              disabled={manual}
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
                disabled={manual}
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {entitySelection.map((x) => (
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
                disabled={!selectedEntity}
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={actionKey}
                onChange={(e) => setActionKey(e.target.value)}
              >
                {!actionSelection?.length && (
                  <MenuItem disabled>
                    No Actions on Object
                  </MenuItem>
                )}
                {actionSelection && actionSelection.map((x) => (
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
          onClick={() => saveTrigger()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TriggerDialog.defaultProps = {
  initial: {},
};

export default TriggerDialog;
