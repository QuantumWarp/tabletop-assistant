import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import HistoryRow from '../features/history/HistoryRow';
import TopBar from '../components/TopBar';
import HistoryUpdateDialog from '../features/history/HistoryUpsertDialog';
import { useGetHistoryQuery } from '../store/api';

const HistoryPage = () => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const [filter, setFilter] = useState('');
  const [newHistoryDialogOpen, setNewHistoryDialogOpen] = useState(false);
  const { data: entries } = useGetHistoryQuery(tabletopId);

  const filteredEntries = entries
    ? entries.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedEntries = filteredEntries.sort(
    (a, b) => (a.createdAt > b.createdAt ? -1 : 1),
  );

  return (
    <>
      <TopBar title="History">
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => setNewHistoryDialogOpen(true)}
        >
          New Entry
        </Button>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container
          sx={{
            py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
          maxWidth="lg"
        >
          {sortedEntries.map((x) => (
            <HistoryRow key={x.id} entry={x} />
          ))}
        </Container>
      </Box>

      {newHistoryDialogOpen && (
        <HistoryUpdateDialog
          tabletopId={tabletopId}
          open={newHistoryDialogOpen}
          onClose={() => setNewHistoryDialogOpen(false)}
        />
      )}
    </>
  );
};

export default HistoryPage;
