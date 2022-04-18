import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Template } from 'tabletop-assistant-common';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => (
  <Card>
    <CardActionArea>
      {template.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={template.imageUrl}
          alt="Image not available"
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {template.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TemplateCard;
