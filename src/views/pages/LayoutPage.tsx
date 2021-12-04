import React from 'react';
import {
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectCurrentLayout, selectLayouts, setLayoutId } from '../../store/config-slice';
import LayoutContainer from '../../components/layout/LayoutContainer';
import TopBar from '../../components/common/TopBar';

const LayoutPage = () => {
  const dispatch = useAppDispatch();
  const layouts = useAppSelector(selectLayouts);
  const currentLayout = useAppSelector(selectCurrentLayout);

  return (
    <>
      <TopBar title={currentLayout ? currentLayout.name : 'Layout'}>
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
      </TopBar>

      <Container sx={{ py: 2 }} maxWidth="lg">
        {currentLayout && <LayoutContainer layout={currentLayout} />}
      </Container>
    </>
  );
};

export default LayoutPage;
