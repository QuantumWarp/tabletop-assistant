import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../store/store';
import { selectConfigurations } from '../store/main-slice';
import './HomePage.css';

const HomePage = () => {
  const history = useHistory();
  const configurations = useAppSelector(selectConfigurations);

  return (
    <div className="home-page">
      <div className="title">
        <span>Tabletop Assistant</span>
      </div>

      <Grid container spacing={4}>
        {configurations.map((con) => (
          <Grid item xs={4} key={con.id}>
            <Card onClick={() => history.push(`/configuration/${con.id}/layout`)}>
              <CardMedia
                component="img"
                height="200"
                image={con.img}
                alt={con.name}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {con.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {con.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Add New
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
