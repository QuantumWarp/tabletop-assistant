import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Entity } from '@/common';
import './Entity.css';

interface EntityCardProps {
  entity: Entity;
  onClick: () => void;
}

const EntityCard = ({ entity, onClick }: EntityCardProps) => (
  <Card className="entity-card">
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Grid container>
          <Grid className="icon" item xs={2}>
            {entity.icon && <Icon icon={entity.icon} />}
          </Grid>

          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
              {entity.name}
            </Typography>

            {entity.tags.map((x) => (
              <Chip sx={{ marginRight: '8px' }} key={x} label={x} />
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default EntityCard;
