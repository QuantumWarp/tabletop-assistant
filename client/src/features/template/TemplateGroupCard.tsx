import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { TemplateGroup } from '@tabletop-assistant/common';

interface TemplateGroupCardProps {
  templateGroup: TemplateGroup;
  onClick: () => void;
}

const TemplateGroupCard = ({ templateGroup, onClick }: TemplateGroupCardProps) => (
  <Card>
    <CardActionArea onClick={onClick}>
      {templateGroup.imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={templateGroup.imageUrl}
          alt="Image not available"
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {templateGroup.name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TemplateGroupCard;
