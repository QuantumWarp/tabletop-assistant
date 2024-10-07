import { TemplateGroup, TemplateRoot } from '@tabletop-assistant/common';
import { Grid } from '@mui/material';
import { useGetTemplateQuery } from '../../store/api';
import TemplateGroupCard from './TemplateGroupCard';

interface TemplateGroupTilesProps {
  templateRoot: TemplateRoot;
  onChange: (group: TemplateGroup, selected: boolean) => void;
}

const TemplateGroupTiles = ({ templateRoot, onChange }: TemplateGroupTilesProps) => {
  const { data: collection } = useGetTemplateQuery(templateRoot._id);

  return (
    <Grid container spacing={6}>
      {collection && collection.groups.map((group) => (
        <Grid key={group._id} item xs={4}>
          <TemplateGroupCard
            templateGroup={group}
            onClick={() => onChange(group, true)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateGroupTiles;
