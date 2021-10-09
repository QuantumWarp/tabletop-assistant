import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppDispatch } from './store/store';
import { loadConfigurations } from './store/main-slice';
import HomePage from './views/HomePage';
import MainView from './views/MainView';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadConfigurations());
  }, [dispatch]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/configuration/:configurationId">
          <MainView />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
