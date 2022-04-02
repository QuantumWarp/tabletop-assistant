import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { Entity } from 'tabletop-assistant-common';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';

interface EntityCardProps {
  entity: Entity;
  onClick: () => void;
}

const EntityCard = ({ entity, onClick }: EntityCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <CardContent>
        <TabletopIcon icon={(entity.icon || 'Heavy') as TabletopIconType} />
        <Typography gutterBottom variant="h5" component="div">
          {entity.name}
        </Typography>

        {entity.tags.map((x) => (
          <Chip key={x} label={x} />
        ))}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default EntityCard;
