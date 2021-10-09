import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import LayoutContainer from '../../display/LayoutContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectTabIndex, selectTabs, setTabIndex } from '../../store/configuration-slice';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(selectTabs);
  const tabIndex = useAppSelector(selectTabIndex);
  const currentTab = tabs && tabs[tabIndex];

  return (
    <div className="layout-page">
      <Tabs
        value={tabIndex}
        onChange={(_e, val) => dispatch(setTabIndex(val))}
        centered
      >
        {tabs?.map((tab, index) => (
          <Tab label={tab.name} value={index} />
        ))}
      </Tabs>

      {currentTab && <LayoutContainer tab={currentTab} />}
    </div>
  );
};

export default MainLayout;
