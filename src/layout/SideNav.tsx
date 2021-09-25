import React, { CSSProperties } from 'react';
import { setTab } from '../store/main-slice';
import { useAppDispatch } from '../store/store';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const SideNav = () => {
  const dispatch = useAppDispatch();

  return (
    <div style={classes.sideNav}>
      <button type="button" onClick={() => dispatch(setTab('display'))}>Display</button>
      <button type="button" onClick={() => dispatch(setTab('roller'))}>Roller</button>
      <button type="button" onClick={() => dispatch(setTab('history'))}>History</button>
    </div>
  );
};

export default SideNav;
