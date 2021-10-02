import React, { CSSProperties, useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { addGameObjects, setLayout } from './store/main-slice';
import MainLayout from './layout/MainLayout';
import objects from './examples/objects';
import layout from './examples/layout';

const classes: { [key: string]: CSSProperties } = {
  app: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLayout(layout));
    dispatch(addGameObjects([...objects]));
  }, [dispatch]);

  return (
    <div style={classes.app}>
      <MainLayout />
    </div>
  );
};

export default App;
