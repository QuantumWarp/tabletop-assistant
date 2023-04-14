import {
  Box, Button, Container, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateGroup, TemplateRoot } from 'tabletop-assistant-common';
import TemplateGroupTiles from './TemplateGroupTiles';
import TemplateRootTiles from './TemplateRootTiles';
import TemplateImportDialog from './TemplateImportDialog';

const TemplatePage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();

  const [templateRoot, setTemplateRoot] = useState<TemplateRoot>();
  const [templateGroup, setTemplateGroup] = useState<TemplateGroup>();

  return (
    <Box sx={{ flex: 1, overflow: 'auto' }}>
      <Container sx={{ py: 2 }} maxWidth="lg">
        {!templateRoot && (
          <>
            <Typography py={2} color="text.secondary" paragraph>
              There are no layouts for this tabletop yet. We recommend starting from a
              template below if this is your first time.
            </Typography>

            <TemplateRootTiles
              onChange={(selected) => setTemplateRoot(selected)}
            />
          </>
        )}

        {templateRoot && (
          <>
            <Box py={2} display="flex" alignItems="center">
              <Button variant="outlined" onClick={() => setTemplateRoot(undefined)}>
                Back
              </Button>

              <Typography my={0} pl={2} variant="h5" color="text.secondary" paragraph>
                <b>{templateRoot.name}</b>
              </Typography>
            </Box>

            <TemplateGroupTiles
              templateRoot={templateRoot}
              onChange={(selected) => setTemplateGroup(selected)}
            />
          </>
        )}

        {templateRoot && templateGroup && (
          <TemplateImportDialog
            tabletopId={tabletopId}
            templateRoot={templateRoot}
            templateGroup={templateGroup}
            open={Boolean(templateGroup)}
            onClose={() => setTemplateGroup(undefined)}
          />
        )}
      </Container>
    </Box>
  );
};

export default TemplatePage;
