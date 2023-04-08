import React, { useState } from 'react';
import {
  Box, Button, Container, TextField,
} from '@mui/material';
import TopBar from '../components/TopBar';
import ObjectUpsertDialog from '../features/entity/upsert/EntityUpsertDialog';
import EntityList from '../features/entity/EntityList';

const EntityInstancePage = () => {
  const [filter, setFilter] = useState('');
  const [newEntityDialogOpen, setNewEntityDialogOpen] = useState(false);

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
          New Object
        </Button>

        {newEntityDialogOpen && (
          <ObjectUpsertDialog
            open={newEntityDialogOpen}
            onClose={() => setNewEntityDialogOpen(false)}
          />
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <EntityList
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default EntityInstancePage;
