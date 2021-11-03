import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './views/HomePage';
import MainView from './views/MainView';
import './App.css';

const App = () => (
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

export default App;
