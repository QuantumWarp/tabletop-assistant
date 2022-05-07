import React, { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  IconButton,
  Container,
  Stack,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Layout } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import LayoutConfigContainer from './LayoutConfigContainer';
import TopBar from '../common/TopBar';
import LayoutUpsertDialog from './LayoutUpsertDialog';
import { useGetLayoutsQuery, useUpdateLayoutMutation } from '../store/api';

const LayoutConfigPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [editLayout, setEditLayout] = useState<Layout | undefined>(undefined);
  const [newLayout, setNewLayout] = useState(false);

  const [layoutId, setLayoutId] = useState<string | false>();

  const [updatedLayout, setUpdatedLayout] = useState<Layout>();
  const [updatedLayoutOrder, setUpdatedLayoutOrder] = useState<Layout[]>();

  const currentLayout = updatedLayout || layouts?.find((x) => x._id === layoutId);
  const layoutList = layouts
    ?.map((x) => (x._id === updatedLayout?._id ? updatedLayout : x));

  const [updateLayout] = useUpdateLayoutMutation();
  const debouncedUpdate = useDebouncedCallback(
    async () => {
      if (updatedLayout) await updateLayout(updatedLayout);
    },
    1500,
  );

  useEffect(() => {
    if (!layoutList) return;
    if (layoutList.find((x) => x._id === layoutId)) return;
    setLayoutId(layoutList[0]._id);
    setUpdatedLayoutOrder(layoutList.sort((a, b) => (a.order < b.order ? 1 : -1)));
  }, [layoutList, layoutId]);

  useEffect(() => {
    setUpdatedLayout(undefined);
  }, [layouts]);

  const changeTab = async (newLayoutId: string) => {
    if (updatedLayout) {
      await updateLayout(updatedLayout);
    }
    setLayoutId(newLayoutId);
  };

  const layoutChangeHandler = (update: Partial<Layout>) => {
    if (!currentLayout) return;
    setUpdatedLayout({
      ...currentLayout,
      ...update,
    });
    debouncedUpdate();
  };

  const orderChangeHandler = async (layout: Layout, direction: number) => {
    if (!updatedLayoutOrder) return;
    const currentIndex = updatedLayoutOrder.indexOf(layout);
    const newIndex = currentIndex + direction;

    const newOrder = [...updatedLayoutOrder];
    newOrder[newIndex] = layout;
    newOrder[currentIndex] = updatedLayoutOrder[newIndex];

    setUpdatedLayoutOrder(newOrder);
  };

  return (
    <>
      <TopBar title="Configure">
        <Tabs
          variant="scrollable"
          value={currentLayout?._id || false}
          onChange={(_e, val) => changeTab(val)}
        >
          {updatedLayoutOrder?.map((layout) => (
            <Tab
              key={layout._id}
              label={layout.name}
              value={layout._id}
              sx={{ textDecoration: layout.hidden ? 'line-through' : 'none' }}
            />
          ))}
        </Tabs>

        <Stack
          marginLeft={2}
          direction="row"
          justifyContent="center"
        >
          {currentLayout !== undefined && (
            <>
              <IconButton
                title="Move Layout Left"
                onClick={() => orderChangeHandler(currentLayout, -1)}
              >
                <Icon icon="bi:arrow-left-circle-fill" />
              </IconButton>

              <IconButton
                title="Move Layout Right"
                onClick={() => orderChangeHandler(currentLayout, 1)}
              >
                <Icon icon="bi:arrow-right-circle-fill" />
              </IconButton>

              <IconButton
                title="Toggle Visible"
                onClick={() => layoutChangeHandler({ hidden: !currentLayout.hidden })}
              >
                {currentLayout.hidden && <Icon icon="bi:eye-slash-fill" />}
                {!currentLayout.hidden && <Icon icon="bi:eye-fill" />}
              </IconButton>

              <IconButton
                title="Edit Layout"
                onClick={() => setEditLayout(currentLayout)}
              >
                <Icon icon="bi:pencil-fill" />
              </IconButton>
            </>
          )}

          <IconButton
            color="primary"
            title="New Layout"
            onClick={() => setNewLayout(true)}
          >
            <Icon icon="bi:plus-circle-fill" />
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
