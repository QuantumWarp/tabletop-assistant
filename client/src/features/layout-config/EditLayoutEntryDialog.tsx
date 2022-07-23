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
import { useGetEntitiesQuery } from '../../store/api';
import DisplayHelper from '../../helpers/display.helper';
import DisplayType from '../../models/display.type';

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

  const [entityId, setEntityId] = useState(initial?.entityId || '');
  const [displayKey, setDisplayKey] = useState(initial?.displayKey || '');

  const selectedEntity = entities?.find((x) => x._id === entityId);
  const selectedDisplay = selectedEntity?.displays?.find((x) => x.key === displayKey);

  useEffect(() => {
    const defaultDisplay = selectedEntity?.displays?.find((x) => x.default);
    if (!defaultDisplay) return;
    setDisplayKey(defaultDisplay.key);
  }, [selectedEntity]);

  const saveEntry = () => {
    const updatedProps = {
      entityId,
      displayKey,
      position: initial?.position || position || { left: 0, top: 0 },
      size: initial?.size || DisplayHelper.defaultSize(
        selectedDisplay?.type as DisplayType || DisplayType.Card,
      ),
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
              <InputLabel>Display</InputLabel>
              <Select
                label="Display"
                disabled={!selectedEntity}
                value={displayKey}
                onChange={(e) => setDisplayKey(e.target.value as DisplayType)}
              >
                {selectedEntity?.displays
                  .map((x) => (
                    <MenuItem key={x.key} value={x.key}>
                      {x.name}
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
