import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItem,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  ArrowLeft as MapIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import {
  CreateEntity, EntityDisplay, EntityDisplayType, SlotFieldMapping,
} from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../../components/DeleteConfirmDialog';
import EditDisplayMappingDialog from './EditDisplayMappingDialog';
import DisplayHelper from '../../../helpers/display.helper';
import LayoutDisplay from '../../display/LayoutDisplay';
import LayoutPositionHelper from '../../../helpers/layout-position.helper';
import FieldHelper from '../../../helpers/field.helper';
import useIsFirstRender from '../../../utils/is-first-render';

interface EditDisplayDialogProps {
  initial?: Partial<EntityDisplay>;
  displays: EntityDisplay[];
  entity: CreateEntity;
  open: boolean;
  onSave: (display: EntityDisplay) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditDisplayDialog = ({
  initial, displays, entity, open, onSave, onDelete, onClose,
}: EditDisplayDialogProps) => {
  const isFirstRender = useIsFirstRender();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editMapping, setEditMapping] = useState<Partial<SlotFieldMapping>>();

  const onlyDisplay = displays.filter((x) => x !== initial).length === 0;

  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState<EntityDisplayType>(initial?.type || 'card');
  const [defaultVal, setDefault] = useState(initial?.default || onlyDisplay);
  const [mappings, setMappings] = useState(initial?.mappings || DisplayHelper.autoMapping(
    initial?.type || 'card',
    FieldHelper.getFields(entity),
    entity.actions,
  ));

  const key = name
    ? FieldHelper.createKey(name)
    : type;

  const display: EntityDisplay = {
    name,
    key,
    type,
    default: defaultVal,
    mappings,
  };

  const saveDisplay = () => {
    onSave({ ...initial, ...display });
    onClose();
  };

  useEffect(() => {
    if (isFirstRender && initial?.type) return;

    setMappings(DisplayHelper.autoMapping(
      type,
      FieldHelper.getFields(entity),
      entity.actions,
    ));
    setName(DisplayHelper.displayName(type));
  }, [type, entity, isFirstRender, initial?.type]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>
          {initial?.type ? 'Update ' : 'Create '}
          Display
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={5} container spacing={2} marginTop={0}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  disabled={Boolean(initial?.type)}
                  value={type}
                  onChange={(e) => setType(e.target.value as EntityDisplayType)}
                >
                  {DisplayHelper.list().map((x) => (
                    <MenuItem key={x} value={x}>
                      {DisplayHelper.displayName(x)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                disabled={Boolean(initial?.name)}
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              {!onlyDisplay && (
                <FormControlLabel
                  label="Default"
                  control={(
                    <Checkbox
                      checked={defaultVal}
                      onChange={(e) => setDefault(e.target.checked)}
                    />
                  )}
                />
              )}
            </Grid>

            {mappings.length > 0 && (
              <Grid item xs={12}>
                <Divider />

                {mappings.map((mapping) => {
                  const slot = DisplayHelper.slots(type).find((x) => x.key === mapping.slotKey);
                  const field = FieldHelper.getFields(entity)
                    .find((x) => x.key === mapping.fieldKey);
                  const action = entity.actions.find((x) => x.key === mapping.fieldKey);
                  return (
                    <ListItem dense key={mapping.slotKey}>
                      <ListItemButton
                        onClick={() => setEditMapping({ ...editMapping })}
                      >
                        <Grid container>
                          <Grid item xs={5} container justifyContent="flex-end">{slot?.name}</Grid>
                          <Grid item xs={2} container justifyContent="center"><MapIcon /></Grid>
                          <Grid item xs={5}>{slot?.type === 'action' ? action?.name : field?.name}</Grid>
                        </Grid>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </Grid>
            )}

            <Grid item container xs={12} justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => setEditMapping({})}
              >
                Add Mapping
              </Button>
            </Grid>

            {editMapping && type && (
              <EditDisplayMappingDialog
                initial={editMapping}
                entity={entity}
                usedSlotKeys={Object.keys(mappings)}
                type={type}
                open={Boolean(editMapping)}
                onSave={(mapping) => {
                  setMappings(mappings
                    .filter((x) => x.slotKey !== mapping.slotKey)
                    .concat([mapping]));
                }}
                onDelete={() => {
                  if (!editMapping.slotKey) return;
                  setMappings(mappings
                    .filter((x) => x.slotKey !== editMapping.slotKey));
                }}
                onClose={() => setEditMapping(undefined)}
              />
            )}
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item xs container justifyContent="center" my={2}>
            <Box
              sx={{ ...LayoutPositionHelper.getSizeStyle(DisplayHelper.defaultSize(type), 1000) }}
            >
              <LayoutDisplay
                preview
                display={display}
                entity={entity}
                slotMappings={mappings}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.type && (
          <>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Note"
              objName={initial.type}
              open={deleteOpen}
              onDelete={() => { onDelete(); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
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
          onClick={() => saveDisplay()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDisplayDialog.defaultProps = {
  initial: {},
};

export default EditDisplayDialog;
