import { useState } from 'react';
import {
  Grid2,
  Button,
  Stack,
  Container,
} from '@mui/material';
import { TabletopUpsertDialog } from './TabletopUpsertDialog';
import { useGetTabletopsQuery } from '../../store/api';
import { TabletopImportDialog } from './TabletopImportDialog';
import { TabletopTile } from './TabletopTile';

export function TabletopList() {
  const { data: tabletops } = useGetTabletopsQuery();

  const [newTabletopDialogOpen, setNewTabletopDialogOpen] = useState(false);
  const [importTabletopDialogOpen, setImportTabletopDialogOpen] = useState(false);

  return (
    <>
      <Container maxWidth="sm">
        <Stack
          sx={{ pt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => setNewTabletopDialogOpen(true)}>New Tabletop</Button>
          <Button variant="contained" onClick={() => setImportTabletopDialogOpen(true)}>Import</Button>
        </Stack>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid2 container spacing={4}>
          {tabletops && tabletops.map((tabletop) => (
            <TabletopTile key={tabletop.id} tabletop={tabletop} />
          ))}
        </Grid2>
      </Container>

      {newTabletopDialogOpen && (
        <TabletopUpsertDialog
          open={newTabletopDialogOpen}
          onClose={() => setNewTabletopDialogOpen(false)}
        />
      )}

      {importTabletopDialogOpen && (
        <TabletopImportDialog
          open={importTabletopDialogOpen}
          onClose={() => setImportTabletopDialogOpen(false)}
        />
      )}
    </>
  );
};
