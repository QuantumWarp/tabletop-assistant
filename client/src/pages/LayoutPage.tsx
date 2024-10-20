import { useEffect, useState } from 'react';
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
import TemplateStarter from '../features/template/TemplateStarter';

const LayoutPage = () => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: layouts } = useGetLayoutsQuery(tabletopId);

  const [layoutId, setLayoutId] = useState<string | false>();
  const currentLayout = layouts?.find((x) => x.id === layoutId);

  const layoutList = layouts
    ?.filter((x) => !x.hidden)
    ?.sort((a, b) => (a.order > b.order ? 1 : -1));

  useEffect(() => {
    if (!layoutList) return;
    if (layoutList.find((x) => x.id === layoutId)) return;
    if (layoutList.length === 0) return;
    setLayoutId(layoutList[0].id);
  }, [layoutList, layoutId]);

  return (
    <>
      <TopBar title={currentLayout ? currentLayout.name : 'Layout'}>
        <Tabs
          variant="scrollable"
          value={currentLayout?.id || false}
          onChange={(_e, val) => setLayoutId(val)}
        >
          {layoutList?.map((layout) => (
            <Tab
              key={layout.id}
              label={layout.name}
              value={layout.id}
            />
          ))}
        </Tabs>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {layouts && layouts.length > 0 && (
          <Container sx={{ py: 2 }} maxWidth="lg">
            {currentLayout && <LayoutContainer layout={currentLayout} />}
          </Container>
        )}

        {layouts && layouts.length === 0 && (
          <TemplateStarter />
        )}
      </Box>
    </>
  );
};

export default LayoutPage;
