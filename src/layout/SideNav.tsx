import React, { CSSProperties } from 'react';
import { selectLayout, setTabIndex } from '../store/main-slice';
import { useAppDispatch, useAppSelector } from '../store/store';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const SideNav = () => {
  const dispatch = useAppDispatch();
  const layout = useAppSelector(selectLayout);
  const tabCount = layout ? layout.tabs.length : 0;

  return (
    <div style={classes.sideNav}>
      {layout && layout.tabs.map((tab, index) => (
        <button type="button" onClick={() => dispatch(setTabIndex(index))}>{tab.name}</button>
      ))}

      <button type="button" onClick={() => dispatch(setTabIndex(tabCount + 1))}>Roller</button>
      <button type="button" onClick={() => dispatch(setTabIndex(tabCount + 2))}>History</button>
    </div>
  );
};

export default SideNav;
