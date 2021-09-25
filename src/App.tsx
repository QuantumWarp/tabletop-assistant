import React, { CSSProperties, useEffect } from 'react';
import objects from './examples/objects';
import { useAppDispatch } from './store/store';
import {
  addGameObjects,
} from './store/main-slice';
import MainLayout from './layout/MainLayout';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
  },
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addGameObjects(...objects));
  }, [dispatch]);

  return (
    <div style={classes.app}>
      <MainLayout />
    </div>
  );
};

export default App;
