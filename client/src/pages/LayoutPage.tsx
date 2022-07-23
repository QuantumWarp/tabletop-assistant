import React, { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useGetLayoutsQuery } from '../store/api';
import LayoutContainer from '../features/layout/LayoutContainer';

const LayoutPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [layoutId, setLayoutId] = useState<string | false>();
  const currentLayout = layouts?.find((x) => x._id === layoutId);

  const layoutList = layouts
    ?.filter((x) => !x.hidden)
    ?.sort((a, b) => (a.order > b.order ? 1 : -1));

  useEffect(() => {
    if (!layoutList) return;
    if (layoutList.find((x) => x._id === layoutId)) return;
    if (layoutList.length === 0) return;
    setLayoutId(layoutList[0]._id);
  }, [layoutList, layoutId]);

  return (
    <>
      <TopBar title={currentLayout ? currentLayout.name : 'Layout'}>
        <Tabs
          variant="scrollable"
          value={currentLayout?._id || false}
          onChange={(_e, val) => setLayoutId(val)}
        >
          {layoutList?.map((layout) => (
            <Tab
              key={layout._id}
              label={layout.name}
              value={layout._id}
            />
          ))}
        </Tabs>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          {currentLayout && <LayoutContainer layout={currentLayout} />}
        </Container>
      </Box>
    </>
  );
};

export default LayoutPage;
