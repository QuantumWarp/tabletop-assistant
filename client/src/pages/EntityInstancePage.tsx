import React, { useState } from 'react';
import {
  Box, Button, Container, TextField,
} from '@mui/material';
import TopBar from '../components/TopBar';
import ObjectUpsertDialog from '../features/entity/upsert/EntityUpsertDialog';
import EntityInstanceList from '../features/entity-instance/EntityInstanceList';
import TemplateEntityDialog from '../features/template/TemplateEntityDialog';
import { useTemplateRoot } from '../helpers/hooks/use-template-root';

const EntityInstancePage = () => {
  const { isLoading, templateRoot } = useTemplateRoot();

  const [filter, setFilter] = useState('');
  const [newEntityDialogOpen, setNewEntityDialogOpen] = useState(false);
  const [existingEntityDialogOpen, setExistingEntityDialogOpen] = useState(false);
  const [templateEntityDialogOpen, setTemplateEntityDialogOpen] = useState(false);

  return (
    <>
      <TopBar title="Objects">
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => setNewEntityDialogOpen(true)}
        >
          New
        </Button>

        <Button
          variant="outlined"
          onClick={() => setExistingEntityDialogOpen(true)}
        >
          Existing
        </Button>

        <Button
          variant="outlined"
          onClick={() => setTemplateEntityDialogOpen(true)}
        >
          Template
        </Button>

        {newEntityDialogOpen && (
          <ObjectUpsertDialog
            open={newEntityDialogOpen}
            onClose={() => setNewEntityDialogOpen(false)}
          />
        )}

        {existingEntityDialogOpen && (
          <ObjectUpsertDialog
            open={newEntityDialogOpen}
            onClose={() => setExistingEntityDialogOpen(false)}
          />
        )}

        {templateEntityDialogOpen && !isLoading && (
          <TemplateEntityDialog
            tag={templateRoot?.tag || ''}
            open={templateEntityDialogOpen}
            onClose={() => setTemplateEntityDialogOpen(false)}
          />
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <EntityInstanceList
            tag={templateRoot?.tag || ''}
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default EntityInstancePage;
