import { useState } from 'react';
import {
  Box, Button, Container, Grid2, TextField,
} from '@mui/material';
import TopBar from '../components/TopBar';
import { EntityUpsertDialog } from '../features/entity/upsert/EntityUpsertDialog';
import { EntityList } from '../features/entity/EntityList';
import { useParams } from 'react-router-dom';

export function EntityPage() {
  const { tabletopId } = useParams() as { tabletopId: string };
  const [filter, setFilter] = useState('');
  const [newEntityDialogOpen, setNewEntityDialogOpen] = useState(false);

  return (
    <>
      <TopBar title="Entities">
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Grid2 container spacing={2}>
          <Button
            variant="outlined"
            onClick={() => setNewEntityDialogOpen(true)}
          >
            New
          </Button>

          <Button variant="outlined">
            Existing (TODO)
          </Button>

          <Button variant="outlined">
            Import (TODO)
          </Button>
        </Grid2>

        {newEntityDialogOpen && (
          <EntityUpsertDialog
            tabletopId={tabletopId}
            open={newEntityDialogOpen}
            onClose={() => setNewEntityDialogOpen(false)}
          />
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <EntityList filter={filter} />
        </Container>
      </Box>
    </>
  );
};
