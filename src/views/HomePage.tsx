import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useAppSelector } from '../store/store';
import { selectConfigs } from '../store/main-slice';
import './HomePage.css';
import ConfigUpdateDialog from '../components/config-info/ConfigUpdateDialog';

const HomePage = () => {
  const history = useHistory();
  const configs = useAppSelector(selectConfigs);
  const [newConfigDialogOpen, setNewConfigDialogOpen] = useState(false);

  return (
    <div className="home-page">
      <div className="title">
        <span>Tabletop Assistant</span>
      </div>

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

        <Grid item xs={4}>
          <Card>
            <CardActionArea onClick={() => setNewConfigDialogOpen(true)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add New
                </Typography>
              </CardContent>
            </CardActionArea>

            <ConfigUpdateDialog
              open={newConfigDialogOpen}
              onClose={() => setNewConfigDialogOpen(false)}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
