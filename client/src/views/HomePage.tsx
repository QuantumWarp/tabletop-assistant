import React from 'react';
import {
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import WindowIcon from '@mui/icons-material/GridViewSharp';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import DarkModeToggle from '../components/singleton/DarkModeToggle';
import ConfigList from '../components/config-info/ConfigList';

const HomePage = () => {
  const { instance } = useMsal();

  return (
    <Box
      sx={{
        pt: 8,
        pb: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="sm">
        <UnauthenticatedTemplate>
          <Button
            variant="outlined"
            startIcon={<WindowIcon />}
            onClick={() => instance.loginPopup({
              scopes: ['User.Read'],
            })}
          >
            Login
          </Button>
        </UnauthenticatedTemplate>

        <Typography variant="h2" align="center" gutterBottom>
          Tabletop Assistant
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          A customisable tool to allow you to create dynamic layouts
          and record the events in your tabletop sessions, allowing you
          to focus on the game.
        </Typography>
      </Container>

      <AuthenticatedTemplate>
        <ConfigList />
      </AuthenticatedTemplate>

      <Container maxWidth="sm" component="footer">
        <DarkModeToggle />

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
        >
          Thank you for supporting Tabletop Assistant!
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePage;
