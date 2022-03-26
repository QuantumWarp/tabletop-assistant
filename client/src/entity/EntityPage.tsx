import React, { useState } from 'react';
import {
  Box, Button, Container, TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import TopBar from '../common/TopBar';
import ObjectUpsertDialog from './upsert/EntityUpsertDialog';
import EntityList from './EntityList';

const EntityPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
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
            tabletopId={tabletopId}
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

export default EntityPage;
