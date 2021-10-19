import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import LayoutConfigContainer from '../../components/layout-config/LayoutConfigContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectLayoutIndex, selectLayouts, setLayoutIndex } from '../../store/configuration-slice';
import TopBar from '../../components/common/TopBar';
import './LayoutConfigPage.css';

const LayoutConfigPage = () => {
  const dispatch = useAppDispatch();
  const layouts = useAppSelector(selectLayouts);
  const layoutIndex = useAppSelector(selectLayoutIndex);
  const currentLayout = layouts && layouts[layoutIndex];

  return (
    <div className="layout-config-page">
      <TopBar title="Layout Config">
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
      </TopBar>

      <div className="layout-config-content">
        {currentLayout && <LayoutConfigContainer layout={currentLayout} />}
      </div>
    </div>
  );
};

export default LayoutConfigPage;
