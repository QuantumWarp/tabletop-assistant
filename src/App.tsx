import React from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useAppSelector } from './store/store';
import RouterSwitch from './RouterSwitch';
import { selectTheme } from './store/main-slice';

const App = () => {
  const themeString = useAppSelector(selectTheme);
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const currentMode = themeString || (preferDarkMode ? 'dark' : 'light');

  const theme = createTheme({
    palette: {
      mode: currentMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterSwitch />
    </ThemeProvider>
  );
};

export default App;
