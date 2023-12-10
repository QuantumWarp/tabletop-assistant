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
import { CreateEntity, Entity } from '@/common';
import ExportHelper from '../../../helpers/export.helper';
import DeleteConfirmDialog from '../../../components/DeleteConfirmDialog';
import EntityInfoTab from './EntityInfoTab';
import EntityFieldTab from './EntityFieldTab';
import EntityActionTab from './EntityActionTab';
import EntityDisplayTab from './EntityDisplayTab';
import { useCreateEntityMutation, useDeleteEntityMutation, useUpdateEntityMutation } from '../../../store/api';

interface ObjectUpsertDialogProps {
  initial?: Entity;
  open: boolean;
  onClose: (deleted?: boolean) => void;
}

const ObjectUpsertDialog = ({
  initial, open, onClose,
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
    isTemplate: initial?.isTemplate,
    name: initial?.name || '',
    description: initial?.description || '',
    icon: initial?.icon,
    imageUrl: initial?.imageUrl,
    tags: initial?.tags || [],
    fields: initial?.fields || [],
    actions: initial?.actions || [],
    displays: initial?.displays || [],
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

  const saveEntityCopy = () => {
    createEntity({ ...entity });
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>
          { initial?.isTemplate && 'Edit a Copy of a Template' }
          { !initial?.isTemplate && (initial?._id ? 'Update Object' : 'Create Object') }
        </b>
      </DialogTitle>

      <DialogContent sx={{ minHeight: '650px', maxHeight: '650px' }}>
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
            entity={entity}
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
              disabled={loading}
              onClick={saveEntityCopy}
            >
              Save as Copy
            </Button>

            <Button
              variant="outlined"
              disabled={loading}
              onClick={() => ExportHelper.export(entity)}
            >
              Export
            </Button>

            {!entity.isTemplate && (
              <Button
                variant="outlined"
                color="error"
                disabled={loading}
                endIcon={deleting ? <CircularProgress size="20px" /> : <DeleteIcon />}
                onClick={() => setDeleteOpen(true)}
              >
                Delete
              </Button>
            )}

            <DeleteConfirmDialog
              objType="Object"
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

        {!entity.isTemplate && (
          <Button
            variant="outlined"
            disabled={loading}
            endIcon={(creating || updating) ? <CircularProgress size="20px" /> : <SaveIcon />}
            onClick={saveEntity}
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

ObjectUpsertDialog.defaultProps = {
  initial: undefined,
};

export default ObjectUpsertDialog;
