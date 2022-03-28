import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  IconButton,
  Container,
  Stack,
  Box,
} from '@mui/material';
import { Layout } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircle';
import LayoutConfigContainer from './LayoutConfigContainer';
import TopBar from '../common/TopBar';
import LayoutUpsertDialog from './LayoutUpsertDialog';
import { useGetLayoutsQuery } from '../store/api';

const LayoutConfigPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [editLayout, setEditLayout] = useState<Layout | undefined>(undefined);
  const [newLayout, setNewLayout] = useState(false);

  const [layoutId, setLayoutId] = useState(layouts?.[0]._id || '');
  const currentLayout = layouts?.find((x) => x._id === layoutId);

  return (
    <>
      <TopBar title="Layout Config">
        <Tabs
          value={currentLayout?._id}
          onChange={(_e, val) => setLayoutId(val)}
          centered
        >
          {layouts?.map((layout) => (
            <Tab
              key={layout._id}
              label={layout.name}
              value={layout._id}
            />
          ))}
        </Tabs>

        <Stack
          direction="row"
          justifyContent="center"
        >
          {currentLayout !== undefined && (
            <>
              {/* <IconButton
                color="primary"
                title="Move Layout Left"
                disabled={currentIndex === 0}
                onClick={() => dispatch(moveLayout(
                  { id: currentLayout.id, index: currentIndex - 1 },
                ))}
              >
                <LeftIcon />
              </IconButton>

              <IconButton
                color="primary"
                title="Move Layout Right"
                disabled={currentIndex + 1 === layouts?.length}
                onClick={() => dispatch(moveLayout(
                  { id: currentLayout.id, index: currentIndex + 1 },
                ))}
              >
                <RightIcon />
              </IconButton> */}

              <IconButton
                title="Edit Layout"
                onClick={() => setEditLayout(currentLayout)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}

          <IconButton
            color="primary"
            title="New Layout"
            onClick={() => setNewLayout(true)}
          >
            <AddIcon />
          </IconButton>

          {editLayout && (
            <LayoutUpsertDialog
              initial={editLayout}
              tabletopId={tabletopId}
              open={Boolean(editLayout)}
              onClose={() => setEditLayout(undefined)}
            />
          )}

          {newLayout && (
            <LayoutUpsertDialog
              tabletopId={tabletopId}
              open={newLayout}
              onClose={() => setNewLayout(false)}
            />
          )}
        </Stack>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2, height: '100vh' }} maxWidth="lg">
          {currentLayout && <LayoutConfigContainer layout={currentLayout} />}
        </Container>
      </Box>
    </>
  );
};

export default LayoutConfigPage;
