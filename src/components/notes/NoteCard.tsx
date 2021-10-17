import React, { useState } from 'react';
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
}

const NoteCard = ({ note }: NoteCardProps) => {
  const [, setDialogOpen] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => setDialogOpen(true)}>
        {note.img && (
          <CardMedia
            component="img"
            height="140"
            image={note.img}
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
};

export default NoteCard;
