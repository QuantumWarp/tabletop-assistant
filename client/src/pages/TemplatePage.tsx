import {
  Box, Container, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import TemplateSelector from '../features/template/TemplateSelector';

const NotePage = () => {
  const [filter, setFilter] = useState('');

  return (
    <>
      <TopBar title="Templates">
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <TemplateSelector
            filter={filter}
          />
        </Container>
      </Box>
    </>
  );
};

export default NotePage;
