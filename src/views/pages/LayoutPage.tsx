import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectLayoutIndex, selectLayouts, setLayoutIndex } from '../../store/configuration-slice';
import LayoutContainer from '../../components/layout/LayoutContainer';

const LayoutPage = () => {
  const dispatch = useAppDispatch();
  const layouts = useAppSelector(selectLayouts);
  const layoutIndex = useAppSelector(selectLayoutIndex);
  const currentLayout = layouts && layouts[layoutIndex];

  return (
    <div className="layout-page">
      <Tabs
        value={layoutIndex}
        onChange={(_e, val) => dispatch(setLayoutIndex(val))}
        centered
      >
        {layouts?.map((tab, index) => (
          <Tab
            key={tab.id}
            label={tab.name}
            value={index}
          />
        ))}
      </Tabs>

      {currentLayout && <LayoutContainer layout={currentLayout} />}
    </div>
  );
};

export default LayoutPage;
