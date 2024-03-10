import React, { useEffect } from 'react';
import {
  Route, Routes, useNavigate, useParams,
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      navigate('/');
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
            path={`/object-config`}
            element={<ObjectConfigPage />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainView;
