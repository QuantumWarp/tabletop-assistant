import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { TemplateSummary } from 'tabletop-assistant-common';

interface TemplateCardProps {
  template: TemplateSummary;
  onClick: () => void;
}

const TemplateCard = ({ template, onClick }: TemplateCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
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
