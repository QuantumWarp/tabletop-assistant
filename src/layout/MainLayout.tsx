import React, { CSSProperties } from 'react';
import Roller from '../rolling/Roller';
import HistoryView from '../history/HistoryView';
import SideNav from './SideNav';
import DisplayContainer from '../display/DisplayContainer';
import { useAppSelector } from '../store/store';
import { selectTab } from '../store/main-slice';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const MainLayout = () => {
  const tab = useAppSelector(selectTab);

  return (
    <div style={classes.mainLayout}>
      <SideNav />

      <main>
        {tab === 'display' && <DisplayContainer />}
        {tab === 'roller' && <Roller />}
        {tab === 'history' && <HistoryView />}
      </main>
    </div>
  );
};

export default MainLayout;
