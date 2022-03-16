import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './main/HomePage';
import MainView from './main/MainView';

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
