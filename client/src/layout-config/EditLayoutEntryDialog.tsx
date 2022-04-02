import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { LayoutEntry, LayoutPosition } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import { useGetEntitiesQuery } from '../store/api';
import DisplayHelper from '../helpers/display.helper';
import DisplayType from '../helpers/display.type';

interface EditLayoutEntryDialogProps {
  initial?: LayoutEntry;
  position?: LayoutPosition;
  open: boolean;
  onSave: (action: LayoutEntry) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditLayoutEntryDialog = ({
  initial, position, open, onSave, onDelete, onClose,
}: EditLayoutEntryDialogProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const display = DisplayType.Dots;

  const [entityId, setEntityId] = useState(initial?.entityId || '');
  const [displayType, setDisplayType] = useState<DisplayType>(
    initial?.displayType as DisplayType || display,
  );

  const selectedEntity = entities?.find((x) => x._id === entityId);

  useEffect(() => {
    const defaultDisplay = selectedEntity?.displays?.find((x) => x.default);
    if (!defaultDisplay) return;
    setDisplayType(defaultDisplay.type as DisplayType);
  }, [selectedEntity]);

  const saveEntry = () => {
    const updatedProps = {
      entityId,
      displayType,
      position: initial?.position || position || { left: 0, top: 0 },
      size: initial?.size || DisplayHelper.defaultSize(displayType),
    };
    onSave({ ...initial, ...updatedProps });
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>
          {initial?.entityId ? 'Update ' : 'Add '}
          Layout Entry
        </b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Object</InputLabel>
              <Select
                label="Object"
                MenuProps={{ style: { maxHeight: '400px' } }}
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
              >
                {entities && entities.map((x) => (
                  <MenuItem key={x._id} value={x._id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                disabled={!selectedEntity}
                value={displayType}
                onChange={(e) => setDisplayType(e.target.value as DisplayType)}
              >
                {selectedEntity?.displays
                  .map((x) => x.type as DisplayType)
                  .map((x) => (
                    <MenuItem key={x} value={x}>
                      {DisplayHelper.displayName(x)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {initial?.entityId && (
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
          onClick={() => saveEntry()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditLayoutEntryDialog.defaultProps = {
  initial: undefined,
  position: undefined,
};

export default EditLayoutEntryDialog;
