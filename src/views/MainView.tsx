import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useParams, useRouteMatch,
} from 'react-router-dom';
import './MainView.css';
import SideNav from '../components/common/SideNav';
import ActionPage from './pages/ActionPage';
import HistoryView from './pages/HistoryPage';
import LayoutPage from './pages/LayoutPage';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectConfiguration, setConfiguration } from '../store/configuration-slice';
import { selectConfigurations, upsertConfiguration } from '../store/main-slice';
import NotesPage from './pages/NotesPage';
import LayoutConfigPage from './pages/LayoutConfigPage';
import ObjectConfigPage from './pages/ObjectConfigPage';

const MainView = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();

  const currentConfig = useAppSelector(selectConfiguration);
  const configurations = useAppSelector(selectConfigurations);
  const { configurationId } = useParams<{ configurationId: string }>();

  useEffect(() => {
    const newConfig = configurations.find((x) => x.id.toString() === configurationId);
    if (newConfig) {
      if (currentConfig.id === newConfig.id) return;
      dispatch(upsertConfiguration(currentConfig));
      dispatch(setConfiguration(newConfig));
    } else {
      history.push('/');
    }
  }, [configurationId, configurations, dispatch, history, currentConfig]);

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
