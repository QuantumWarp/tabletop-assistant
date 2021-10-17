import React, { useEffect } from 'react';
import {
  Route, Switch, useParams, useRouteMatch,
} from 'react-router-dom';
import './MainView.css';
import SideNav from '../components/common/SideNav';
import ActionPage from './pages/ActionPage';
import HistoryView from './pages/HistoryPage';
import LayoutPage from './pages/LayoutPage';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setConfiguration } from '../store/configuration-slice';
import { selectConfigurations } from '../store/main-slice';
import NotesPage from './pages/NotesPage';
import LayoutConfigPage from './pages/LayoutConfigPage';
import ObjectConfigPage from './pages/ObjectConfigPage';

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

      <main className="content">
        <Switch>
          <Route path={`${path}/layout`}>
            <LayoutPage />
          </Route>

          <Route path={`${path}/notes`}>
            <NotesPage />
          </Route>

          <Route path={`${path}/action`}>
            <ActionPage />
          </Route>

          <Route path={`${path}/history`}>
            <HistoryView />
          </Route>

          <Route path={`${path}/layout-config`}>
            <LayoutConfigPage />
          </Route>

          <Route path={`${path}/object-config`}>
            <ObjectConfigPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default MainView;
