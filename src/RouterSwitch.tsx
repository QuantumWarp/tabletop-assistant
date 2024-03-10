import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import MainView from './views/MainView';

const RouterSwitch = () => (
  <Routes>
    <Route
      path="/"
      element={<HomePage />}
    />

    <Route
      path="/configuration/:configId/*"
      element={<MainView />}
    />
  </Routes>
);

export default RouterSwitch;
