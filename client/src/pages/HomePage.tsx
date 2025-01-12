import { Typography, Container, Box } from '@mui/material';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { TabletopList } from '../features/tabletop/TabletopList';

export function HomePage() {
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
        <Typography variant="h2" align="center" gutterBottom>
          Tabletop Assistant
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          A customisable tool to allow you to create dynamic layouts
          and record the events in your tabletop sessions, allowing you
          to focus on the game.
        </Typography>
      </Container>

      <Box sx={{ flex: 1 }}>
        <TabletopList />
      </Box>

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
