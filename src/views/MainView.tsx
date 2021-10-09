import React, { useEffect } from 'react';
import {
  Route, Switch, useParams, useRouteMatch,
} from 'react-router-dom';
import './MainView.css';
import SideNav from '../components/common/SideNav';
import Roller from './pages/RollerPage';
import HistoryView from './pages/HistoryPage';
import LayoutPage from './pages/LayoutPage';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setConfiguration } from '../store/configuration-slice';
import { selectConfigurations } from '../store/main-slice';
import ConfigurePage from './pages/ConfigurePage';
import NotesPage from './pages/NotesPage';

const MainView = () => {
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();

  const configurations = useAppSelector(selectConfigurations);
  const { configurationId } = useParams<{ configurationId: string }>();

  useEffect(() => {
    const config = configurations.find((x) => x.id.toString() === configurationId) || null;
    dispatch(setConfiguration(config));
  }, [configurationId, configurations, dispatch]);

  return (
    <div className="main-view">
      <SideNav />

      <Switch>
        <Route path={`${path}/layout`}>
          <LayoutPage />
        </Route>

        <Route path={`${path}/configure`}>
          <ConfigurePage />
        </Route>

        <Route path={`${path}/notes`}>
          <NotesPage />
        </Route>

        <Route path={`${path}/roller`}>
          <Roller />
        </Route>

        <Route path={`${path}/history`}>
          <HistoryView />
        </Route>
      </Switch>
    </div>
  );
};

export default MainView;
