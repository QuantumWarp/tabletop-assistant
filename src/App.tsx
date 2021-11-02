import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage';
import MainView from './views/MainView';
import './App.css';
import { useAppDispatch } from './store/store';
import { loadConfigs } from './store/main-slice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadConfigs());
  }, [dispatch]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/configuration/:configId">
          <MainView />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
