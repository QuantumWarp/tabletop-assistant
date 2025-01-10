import { useState } from 'react';
import {
  Box, Button, Container, TextField,
} from '@mui/material';
import TopBar from '../components/TopBar';
import ObjectUpsertDialog from '../features/entity/upsert/EntityUpsertDialog';
import EntityInstanceList from '../features/entity-instance/EntityInstanceList';
import ExistingEntityDialog from '../features/entity-instance/ExistingEntityDialog';

const EntityInstancePage = () => {
  const [filter, setFilter] = useState('');
  const [newEntityDialogOpen, setNewEntityDialogOpen] = useState(false);
  const [existingEntityDialogOpen, setExistingEntityDialogOpen] = useState(false);

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

        {existingEntityDialogOpen && (
          <ExistingEntityDialog
            open={existingEntityDialogOpen}
            onClose={() => setExistingEntityDialogOpen(false)}
          />
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <EntityInstanceList
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default EntityInstancePage;
