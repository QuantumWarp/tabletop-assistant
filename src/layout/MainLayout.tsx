import React, { CSSProperties } from 'react';
import Roller from '../rolling/Roller';
import HistoryView from '../history/HistoryView';
import SideNav from './SideNav';
import DisplayContainer from '../display/DisplayContainer';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  selectConfigure, selectLayout, selectTabIndex, toggleConfigure,
} from '../store/main-slice';
import LayoutContainer from '../display/LayoutContainer';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const tabIndex = useAppSelector(selectTabIndex);
  const layout = useAppSelector(selectLayout);
  const configure = useAppSelector(selectConfigure);
  const tabCount = layout ? layout.tabs.length : 0;
  const tab = layout ? layout.tabs[tabIndex] : null;

  return (
    <div style={classes.mainLayout}>
      <button type="button" onClick={() => dispatch(toggleConfigure())}>Toggle Configure</button>
      <SideNav />

      <main>
        {tab && !configure && <DisplayContainer tab={tab} />}
        {tab && configure && <LayoutContainer tab={tab} />}
        {tabIndex === tabCount + 1 && <Roller />}
        {tabIndex === tabCount + 2 && <HistoryView />}
      </main>
    </div>
  );
};

export default MainLayout;
