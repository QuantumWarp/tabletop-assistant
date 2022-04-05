import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  Alert,
  Box,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { CreateEntity, Entity } from 'tabletop-assistant-common';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import EntityInfoTab from './EntityInfoTab';
import EntityFieldTab from './EntityFieldTab';
import EntityActionTab from './EntityActionTab';
import EntityDisplayTab from './EntityDisplayTab';
import { useCreateEntityMutation, useDeleteEntityMutation, useUpdateEntityMutation } from '../../store/api';

interface ObjectUpsertDialogProps {
  initial?: Entity;
  tabletopId: string;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const ObjectUpsertDialog = ({
  initial, tabletopId, open, onClose,
}: ObjectUpsertDialogProps) => {
  const [createEntity, {
    isLoading: creating,
    isSuccess: createSuccess,
    isError: createError,
  }] = useCreateEntityMutation();

  const [updateEntity, {
    isLoading: updating,
    isSuccess: updateSuccess,
    isError: updateError,
  }] = useUpdateEntityMutation();

  const [deleteEntity, {
    isLoading: deleting,
    isSuccess: deleteSuccess,
    isError: deleteError,
  }] = useDeleteEntityMutation();

  const loading = creating || updating || deleting;
  const success = createSuccess || updateSuccess || deleteSuccess;
  const error = createError || updateError || deleteError;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const [entity, setEntity] = useState<CreateEntity>({
    tabletopId,
    name: '',
    tags: [],
    fields: [],
    actions: [],
    displays: [],
    ...initial,
  });

  useEffect(() => {
    if (success) onClose(deleteSuccess);
  }, [success, deleteSuccess, onClose]);

  const entityChange = (partial: Partial<Entity>) => {
    setEntity({ ...entity, ...partial });
  };

  const saveEntity = () => {
    if (initial?._id !== undefined) {
      updateEntity({ ...initial, ...entity });
    } else {
      createEntity({ ...entity });
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>
          {initial?._id ? 'Update ' : 'Create '}
          Object
        </b>
      </DialogTitle>

      <DialogContent sx={{ minHeight: '600px' }}>
        <Tabs value={selectedTab} onChange={(_, newVal) => setSelectedTab(newVal)}>
          <Tab label="Info" />
          <Tab label="Fields" />
          <Tab label="Actions" />
          <Tab label="Display" />
        </Tabs>

        <Divider />

        <Box hidden={selectedTab !== 0}>
          <EntityInfoTab
            entity={entity}
            onChange={(e) => entityChange({ ...e })}
          />
        </Box>

        <Box hidden={selectedTab !== 1}>
          <EntityFieldTab
            fields={entity.fields}
            onChange={(fields) => entityChange({ fields })}
          />
        </Box>

        <Box hidden={selectedTab !== 2}>
          <EntityActionTab
            actions={entity.actions}
            onChange={(actions) => entityChange({ actions })}
          />
        </Box>

        <Box hidden={selectedTab !== 3}>
          <EntityDisplayTab
            displays={entity.displays}
            entity={entity}
            onChange={(displays) => entityChange({ displays })}
          />
        </Box>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error">An error occured</Alert>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        {initial?._id && (
          <>
            <Button
              variant="outlined"
              color="error"
              disabled={loading}
              endIcon={deleting ? <CircularProgress size="20px" /> : <DeleteIcon />}
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Note"
              objName={initial.name}
              open={deleteOpen}
              onDelete={() => { deleteEntity(initial._id); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button
          variant="outlined"
          disabled={loading}
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          disabled={loading}
          endIcon={(creating || updating) ? <CircularProgress size="20px" /> : <SaveIcon />}
          onClick={saveEntity}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ObjectUpsertDialog.defaultProps = {
  initial: undefined,
};

export default ObjectUpsertDialog;
