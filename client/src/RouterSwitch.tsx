import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainView from './components/MainView';

const RouterSwitch = () => (
  <Routes>
    <Route
      path="/"
      element={<HomePage />}
    />

    <Route
      path="/tabletop/:tabletopId"
      element={<MainView />}
    />
  </Routes>
);

export default RouterSwitch;
