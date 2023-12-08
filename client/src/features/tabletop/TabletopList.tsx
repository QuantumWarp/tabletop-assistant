import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import TabletopUpsertDialog from './TabletopUpsertDialog';
import { useGetTabletopsQuery } from '../../store/api';

const TabletopList = () => {
  const navigate = useNavigate();
  const { data: tabletops } = useGetTabletopsQuery();

  const [newTabletopDialogOpen, setNewTabletopDialogOpen] = useState(false);

  return (
    <>
      <Container maxWidth="sm">
        <Stack
          sx={{ pt: 3 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => setNewTabletopDialogOpen(true)}>New Tabletop</Button>
        </Stack>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {tabletops && tabletops.map((tabletop) => (
            <Grid item xs={4} key={tabletop._id}>
              <Card>
                <CardActionArea onClick={() => navigate(`/tabletop/${tabletop._id}/layout`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={tabletop.imageUrl}
                    alt={tabletop.name}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {tabletop.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {tabletop.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {newTabletopDialogOpen && (
        <TabletopUpsertDialog
          open={newTabletopDialogOpen}
          onClose={() => setNewTabletopDialogOpen(false)}
        />
      )}
    </>
  );
};

export default TabletopList;
