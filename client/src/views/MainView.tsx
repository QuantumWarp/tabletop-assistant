import React from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { Box } from '@mui/material';
import SideNav from '../components/singleton/SideNav';
import ActionPage from './pages/ActionPage';
import HistoryView from './pages/HistoryPage';
import LayoutPage from './pages/LayoutPage';
import NotesPage from '../note/NotePage';
import LayoutConfigPage from './pages/LayoutConfigPage';
import ObjectConfigPage from './pages/ObjectConfigPage';

const MainView = () => {
  const { path } = useRouteMatch();

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
