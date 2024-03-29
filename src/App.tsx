import React from 'react';
import { CssBaseline, useMediaQuery, ThemeProvider } from '@mui/material';
import { useAppSelector } from './store/store';
import RouterSwitch from './RouterSwitch';
import { selectTheme } from './store/main-slice';
import { dark, light } from './models/themes';

const App = () => {
  const themeString = useAppSelector(selectTheme);
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const currentMode = themeString || (preferDarkMode ? 'dark' : 'light');

  const theme = currentMode === 'dark' ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterSwitch />
    </ThemeProvider>
  );
};

export default App;
