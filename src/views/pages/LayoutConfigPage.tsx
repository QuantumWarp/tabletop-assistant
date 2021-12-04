import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  IconButton,
  Container,
  Stack,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircle';
import LeftIcon from '@mui/icons-material/ArrowLeft';
import RightIcon from '@mui/icons-material/ArrowRight';
import LayoutConfigContainer from '../../components/layout-config/LayoutConfigContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  moveLayout, selectCurrentLayout, selectLayouts, setLayoutId,
} from '../../store/config-slice';
import TopBar from '../../components/common/TopBar';
import LayoutConfigTabDialog from '../../components/layout-config/LayoutConfigTabDialog';
import LayoutTab from '../../models/layout/layout-tab';

const LayoutConfigPage = () => {
  const dispatch = useAppDispatch();
  const [editLayout, setEditLayout] = useState<Partial<LayoutTab> | null>(null);

  const layouts = useAppSelector(selectLayouts);
  const currentLayout = useAppSelector(selectCurrentLayout);
  const currentIndex = currentLayout && layouts?.indexOf(currentLayout);

  return (
    <>
      <TopBar title="Layout Config">
        <Tabs
          value={currentLayout?.id}
          onChange={(_e, val) => dispatch(setLayoutId(val))}
          centered
        >
          {layouts?.map((layout) => (
            <Tab
              key={layout.id}
              label={layout.name}
              value={layout.id}
            />
          ))}
        </Tabs>

        <Stack
          direction="row"
          justifyContent="center"
        >
          {currentLayout !== undefined && currentIndex !== undefined && (
            <>
              <IconButton
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
              </IconButton>

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
            onClick={() => setEditLayout({})}
          >
            <AddIcon />
          </IconButton>

          {editLayout && (
            <LayoutConfigTabDialog
              layout={editLayout}
              open={Boolean(editLayout)}
              onClose={() => setEditLayout(null)}
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
