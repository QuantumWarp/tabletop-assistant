import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Note } from 'tabletop-assistant-common';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard = ({ note, onClick }: NoteCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      {note.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={note.imageUrl}
          alt="Image not available"
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {note.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {note.subtitle}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default NoteCard;
