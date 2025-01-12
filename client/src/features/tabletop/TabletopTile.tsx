import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid2,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useGetImageQuery } from '../../store/api';
import { Tabletop } from '@tabletop-assistant/common';

type TabletopTileProps = {
  tabletop: Tabletop;
}

export function TabletopTile({ tabletop }: TabletopTileProps) {
  const navigate = useNavigate();
  
  const { data: image } = useGetImageQuery(
    tabletop.imageId!,
    { skip: !tabletop.imageId }
  );

  return (
    <Grid2 size={4} key={tabletop.id}>
      <Card>
        <CardActionArea onClick={() => navigate(`/tabletop/${tabletop.id}/layout`)}>
          <CardMedia
            component="img"
            height="200"
            image={image?.blob}
            alt={tabletop.name}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tabletop.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {tabletop.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default TabletopTile;
