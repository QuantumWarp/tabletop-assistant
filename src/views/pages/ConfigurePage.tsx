import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import ConfigureContainer from '../../components/configure/ConfigureContainer';
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
          <Tab
            key={tab.id}
            label={tab.name}
            value={index}
          />
        ))}
      </Tabs>

      {currentTab && <ConfigureContainer tab={currentTab} />}
    </div>
  );
};

export default MainLayout;
