import React from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { selectTheme, setTheme } from '../store/main-slice';
import { useAppDispatch, useAppSelector } from '../store/store';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const themeString = useAppSelector(selectTheme);
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const currentMode = themeString || (preferDarkMode ? 'dark' : 'light');

  const toggleDarkMode = () => {
    dispatch(setTheme(currentMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {currentMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};

export default HomePage;
