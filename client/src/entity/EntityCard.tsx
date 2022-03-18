import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { Entity } from 'tabletop-assistant-common';

interface EntityCardProps {
  entity: Entity;
  onClick: () => void;
}

const EntityCard = ({ entity, onClick }: EntityCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {entity.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default EntityCard;
