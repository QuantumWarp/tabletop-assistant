import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { TemplateRoot } from '@/common';

interface TemplateRootCardProps {
  templateRoot: TemplateRoot;
  onClick: () => void;
}

const TemplateRootCard = ({ templateRoot, onClick }: TemplateRootCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      {templateRoot.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={templateRoot.imageUrl}
          alt="Image not available"
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {templateRoot.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TemplateRootCard;
