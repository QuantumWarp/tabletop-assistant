import React, { useState } from 'react';
import {
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
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { EntityDisplay, EntityField } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import EditDisplayMappingDialog from './EditDisplayMappingDialog';
import DisplayType from '../../helpers/display.type';
import DisplayHelper from '../../helpers/display.helper';
import LayoutDisplay from '../../display/LayoutDisplay';

interface EditDisplayDialogProps {
  initial?: Partial<EntityDisplay>;
  fields: EntityField[];
  open: boolean;
  onSave: (display: EntityDisplay) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditDisplayDialog = ({
  initial, fields, open, onSave, onDelete, onClose,
}: EditDisplayDialogProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editMapping, setEditMapping] = useState<Partial<{ key: string, value: string }>>();

  const [type, setType] = useState<DisplayType>(initial?.type as DisplayType || DisplayType.Card);
  const [defaultVal, setDefault] = useState(initial?.default || false);
  const [mappings, setMappings] = useState(initial?.mappings || {});

  const saveField = () => {
    const updatedProps = {
      type,
      default: defaultVal,
      mappings,
    };

    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  // TODO: sort these fixed fields out
  const fixedFields: EntityField[] = [{
    key: '_name',
    name: 'Name (Info)',
    type: 'string',
    initial: 'Test Name',
  }, {
    key: '_icon',
    name: 'Icon (Info)',
    type: 'string',
    initial: 'Test',
  }];

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
                  value={type}
                  onChange={(e) => setType(e.target.value as DisplayType)}
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
              <FormControlLabel
                label="Default"
                control={(
                  <Checkbox
                    checked={defaultVal}
                    onChange={(e) => setDefault(e.target.checked)}
                  />
                )}
              />
            </Grid>

            {Object.entries(mappings).length > 0 && (
              <Grid item xs={12}>
                <Divider />

                {Object.entries(mappings).map((mapping) => (
                  <ListItem dense key={mapping[0]}>
                    <ListItemButton
                      onClick={() => setEditMapping({ key: mapping[0], value: mapping[1] })}
                    >
                      <ListItemText primary={`${mapping[0]} <---> ${mapping[1]}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
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
                fields={fields}
                type={type}
                open={Boolean(editMapping)}
                onClose={() => setEditMapping(undefined)}
                onSave={(mapping) => setMappings({ ...mappings, [mapping.key]: mapping.value })}
              />
            )}
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid item>
            <LayoutDisplay
              preview
              type={type}
              slotFieldMappings={mappings}
              fieldValueMappings={fields.concat(fixedFields).reduce(
                (obj, field) => ({ ...obj, [field.key]: field.initial }), {},
              )}
            />
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
          onClick={() => saveField()}
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
