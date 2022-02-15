import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, useParams, useRouteMatch,
} from 'react-router-dom';
import { Box } from '@mui/material';
import SideNav from '../components/singleton/SideNav';
import ActionPage from './pages/ActionPage';
import HistoryView from './pages/HistoryPage';
import LayoutPage from './pages/LayoutPage';
import { useAppDispatch, useAppSelector } from '../store/store';
import { selectConfig, loadConfig } from '../store/config-slice';
import { selectConfigs, upsertConfig } from '../store/main-slice';
import NotesPage from './pages/NotesPage';
import LayoutConfigPage from './pages/LayoutConfigPage';
import ObjectConfigPage from './pages/ObjectConfigPage';

const MainView = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();

  const currentConfig = useAppSelector(selectConfig);
  const configs = useAppSelector(selectConfigs);
  const { configId } = useParams<{ configId: string }>();

  useEffect(() => {
    const newConfig = configs.find((x) => x.id.toString() === configId);
    if (newConfig) {
      if (currentConfig.id === newConfig.id) return;
      if (currentConfig.id !== '') dispatch(upsertConfig(currentConfig));
      dispatch(loadConfig(newConfig));
    } else {
      history.push('/');
    }
  }, [configId, configs, dispatch, history, currentConfig]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default MainView;
