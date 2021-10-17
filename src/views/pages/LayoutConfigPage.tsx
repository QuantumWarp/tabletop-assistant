import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import ConfigureContainer from '../../components/configure/ConfigureContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectLayoutIndex, selectLayouts, setLayoutIndex } from '../../store/configuration-slice';

const LayoutConfigPage = () => {
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

      {currentLayout && <ConfigureContainer layout={currentLayout} />}
    </div>
  );
};

export default LayoutConfigPage;
