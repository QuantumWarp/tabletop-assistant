import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import TopBar from '../common/TopBar';
import { useGetLayoutsQuery } from '../store/api';
import LayoutContainer from './LayoutContainer';

const LayoutPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [layoutId, setLayoutId] = useState(layouts?.[0]._id || '');
  const currentLayout = layouts?.find((x) => x._id === layoutId);

  return (
    <>
      <TopBar title={currentLayout ? currentLayout.name : 'Layout'}>
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
