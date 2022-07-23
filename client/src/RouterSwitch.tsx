import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainView from './components/MainView';

const RouterSwitch = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>

    <Route path="/tabletop/:tabletopId">
      <MainView />
    </Route>
  </Switch>
);

export default RouterSwitch;
