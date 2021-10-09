import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './MainView.css';
import SideNav from '../common/SideNav';
import MainLayout from '../layout/MainLayout';
import Roller from '../rolling/Roller';
import HistoryView from '../history/HistoryView';

const MainView = () => (
  <div className="main-view">
    <SideNav />

    <Switch>
      <Route path="layout">
        <MainLayout />
      </Route>

      <Route path="configure">
        <MainLayout />
      </Route>

      <Route path="notes">
        <MainLayout />
      </Route>

      <Route path="roller">
        <Roller />
      </Route>

      <Route path="history">
        <HistoryView />
      </Route>
    </Switch>
  </div>
);

export default MainView;
