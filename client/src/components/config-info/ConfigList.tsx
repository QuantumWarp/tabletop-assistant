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
import ConfigUpdateDialog from './ConfigUpdateDialog';
import ConfigImportDialog from '../export/ConfigImportDialog';
import { useGetConfigsQuery } from '../../store/api';

const HomePage = () => {
  const history = useHistory();
  const { data: configs } = useGetConfigsQuery();

  const [newConfigDialogOpen, setNewConfigDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  return (
    <Box>
      <Container maxWidth="sm">
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
          {configs && configs.map((con) => (
            <Grid item xs={4} key={con._id}>
              <Card>
                <CardActionArea onClick={() => history.push(`/configuration/${con._id}/layout`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={con.imageUrl}
                    alt={con.imageUrl}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {con.imageUrl}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {con.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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
