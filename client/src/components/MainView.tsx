import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Box } from '@mui/material';
import SideNav from './SideNav';
import ActionPage from '../pages/ActionPage';
import HistoryView from '../pages/HistoryPage';
import LayoutPage from '../pages/LayoutPage';
import NotesPage from '../pages/NotePage';
import LayoutConfigPage from '../pages/LayoutConfigPage';
import EntityPage from '../pages/EntityPage';
import EntityInstancePage from '../pages/EntityInstancePage';

const MainView = () => {
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
          minWidth: 0,
        }}
      >
        <Routes>
          <Route
            path="/layout"
            element={<LayoutPage />}
          />

          <Route
            path="/notes"
            element={<NotesPage />}
          />

          <Route
            path="/action"
            element={<ActionPage />}
          />

          <Route
            path="/history"
            element={<HistoryView />}
          />

          <Route
            path="/layout-config"
            element={<LayoutConfigPage />}
          />

          <Route
            path="/objects"
            element={<EntityInstancePage />}
          />

          <Route
            path="/custom-objects"
            element={<EntityPage />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainView;
