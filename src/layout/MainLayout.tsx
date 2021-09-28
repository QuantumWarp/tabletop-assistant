import React, { CSSProperties } from 'react';
import Roller from '../rolling/Roller';
import HistoryView from '../history/HistoryView';
import SideNav from './SideNav';
import DisplayContainer from '../display/DisplayContainer';
import { useAppSelector } from '../store/store';
import { selectLayout, selectTabIndex } from '../store/main-slice';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const MainLayout = () => {
  const tabIndex = useAppSelector(selectTabIndex);
  const layout = useAppSelector(selectLayout);
  const tabCount = layout ? layout.tabs.length : 0;
  const tab = layout ? layout.tabs[tabIndex] : null;

  return (
    <div style={classes.mainLayout}>
      <SideNav />

      <main>
        {tab && <DisplayContainer tab={tab} />}
        {tabIndex === tabCount + 1 && <Roller />}
        {tabIndex === tabCount + 2 && <HistoryView />}
      </main>
    </div>
  );
};

export default MainLayout;
