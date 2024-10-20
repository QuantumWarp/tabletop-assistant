import { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  IconButton,
  Container,
  Stack,
  Box,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Layout } from '@tabletop-assistant/common';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import LayoutConfigContainer from '../features/layout-config/LayoutConfigContainer';
import TopBar from '../components/TopBar';
import LayoutUpsertDialog from '../features/layout-config/LayoutUpsertDialog';
import { useGetLayoutsQuery, useUpdateLayoutMutation, useUpdateLayoutOrderMutation } from '../store/api';

const LayoutConfigPage = () => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [editLayout, setEditLayout] = useState<Layout | undefined>(undefined);
  const [newLayout, setNewLayout] = useState(false);

  const [layoutId, setLayoutId] = useState<string | false>();

  const [updatedLayout, setUpdatedLayout] = useState<Layout>();
  const [updatedLayoutOrder, setUpdatedLayoutOrder] = useState<Layout[]>();

  const currentLayout = updatedLayout || layouts?.find((x) => x.id === layoutId);
  const orderedList = (layouts && [...layouts])
    ?.sort((a, b) => (a.order > b.order ? 1 : -1));
  const layoutList = (updatedLayoutOrder || orderedList)
    ?.map((x) => (x.id === updatedLayout?.id ? updatedLayout : x));

  const [updateLayout] = useUpdateLayoutMutation();
  const [updateLayoutOrder] = useUpdateLayoutOrderMutation();
  const debouncedUpdate = useDebouncedCallback(
    () => {
      if (updatedLayout) updateLayout(updatedLayout);
      if (updatedLayoutOrder) updateLayoutOrder(updatedLayoutOrder.map((x) => x.id));
    },
    1500,
  );

  useEffect(() => {
    if (!layoutList) return;
    if (layoutList.find((x) => x.id === layoutId)) return;
    if (layoutList.length === 0) return;
    setLayoutId(layoutList[0].id);
  }, [layoutList, layoutId]);

  useEffect(() => {
    setUpdatedLayout(undefined);
    setUpdatedLayoutOrder(undefined);
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
    if (!layoutList) return;

    const currentIndex = layoutList.indexOf(layout);
    const newIndex = currentIndex + direction;

    const newOrder = [...layoutList];
    newOrder[newIndex] = layout;
    newOrder[currentIndex] = layoutList[newIndex];

    setUpdatedLayoutOrder(newOrder);
    debouncedUpdate();
  };

  return (
    <>
      <TopBar title="Configure">
        <Tabs
          variant="scrollable"
          value={currentLayout?.id || false}
          onChange={(_e, val) => changeTab(val)}
        >
          {layoutList?.map((layout) => (
            <Tab
              key={layout.id}
              label={layout.name}
              value={layout.id}
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

          {newLayout && layoutList && (
            <LayoutUpsertDialog
              tabletopId={tabletopId}
              open={newLayout}
              nextOrder={Math.max(...layoutList.map((x) => x.order)) + 1}
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
