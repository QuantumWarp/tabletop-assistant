import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Note } from '@tabletop-assistant/common';
import { useGetImageQuery } from '../../store/api';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

const NoteCard = ({ note, onClick }: NoteCardProps) => {
  const { data: image } = useGetImageQuery(
    note.imageId!,
    { skip: !note.imageId }
  );

  return (
    <Card>
      <CardActionArea onClick={onClick}>
        {image && (
          <CardMedia
            component="img"
            height="180"
            image={image.blob}
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
  )
};

export default NoteCard;
