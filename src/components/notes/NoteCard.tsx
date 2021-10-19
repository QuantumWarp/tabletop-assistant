import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Note from '../../models/notes/note';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard = ({ note, onClick }: NoteCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      {note.image && (
        <CardMedia
          component="img"
          height="180"
          image={note.image}
          alt="Image not available"
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {note.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {note.subtitle}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default NoteCard;
