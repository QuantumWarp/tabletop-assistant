import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
  Button,
  Stack,
  Container,
  Box,
} from '@mui/material';
import { useAppSelector } from '../store/store';
import { selectConfigs } from '../store/main-slice';
import ConfigUpdateDialog from '../components/config-info/ConfigUpdateDialog';
import ConfigImportDialog from '../components/export/ConfigImportDialog';
import DarkModeToggle from '../components/singleton/DarkModeToggle';

const HomePage = () => {
  const history = useHistory();
  const configs = useAppSelector(selectConfigs);

  const [newConfigDialogOpen, setNewConfigDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

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

        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => setNewConfigDialogOpen(true)}>Create new</Button>
          <Button variant="outlined" onClick={() => setImportDialogOpen(true)}>Import from file</Button>
        </Stack>
      </Container>

      <Container sx={{ py: 8, flex: 1 }} maxWidth="lg">
        <Grid container spacing={4}>
          {configs.map((con) => (
            <Grid item xs={4} key={con.id}>
              <Card>
                <CardActionArea onClick={() => history.push(`/configuration/${con.id}/layout`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={con.info.image}
                    alt={con.info.name}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {con.info.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {con.info.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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

      {newConfigDialogOpen && (
        <ConfigUpdateDialog
          open={newConfigDialogOpen}
          onClose={() => setNewConfigDialogOpen(false)}
        />
      )}

      {importDialogOpen && (
        <ConfigImportDialog
          open={importDialogOpen}
          onClose={() => setImportDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default HomePage;
