import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectTabIndex, selectTabs, setTabIndex } from '../../store/configuration-slice';
import LayoutContainer from '../../components/layout/LayoutContainer';

const LayoutPage = () => {
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

      {currentTab && <LayoutContainer tab={currentTab} />}
    </div>
  );
};

export default LayoutPage;
