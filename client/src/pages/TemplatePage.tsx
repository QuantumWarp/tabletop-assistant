import {
  Box, Button, Container,
} from '@mui/material';
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import TemplateGroupList from '../features/template/TemplateGroupList';
import TemplateRootList from '../features/template/TemplateRootList';

const TemplateRootPage = () => {
  const [templateRootId, setTemplateRootId] = useState('');

  return (
    <>
      <TopBar title="Templates">
        <Button
          variant="outlined"
          onClick={() => setTemplateRootId('')}
        >
          Clear
        </Button>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          {!templateRootId && (
            <TemplateRootList
              onChange={(selected) => setTemplateRootId(selected._id)}
            />
          )}

          {templateRootId && (
            <TemplateGroupList
              templateRootId={templateRootId}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default TemplateRootPage;
