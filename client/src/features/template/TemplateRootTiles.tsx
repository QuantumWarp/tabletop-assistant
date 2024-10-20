import { TemplateRoot } from '@tabletop-assistant/common';
import { Grid } from '@mui/material';
import { useGetTemplatesQuery } from '../../store/api';
import TemplateRootCard from './TemplateRootCard';

interface TemplateRootTilesProps {
  onChange: (templateRoot: TemplateRoot) => void;
}

const TemplateRootTiles = ({ onChange }: TemplateRootTilesProps) => {
  const { data: templates } = useGetTemplatesQuery();

  return (
    <Grid container spacing={6}>
      {templates && templates.map((templateRoot) => (
        <Grid key={templateRoot.id} item xs={4}>
          <TemplateRootCard
            templateRoot={templateRoot}
            onClick={() => onChange(templateRoot)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateRootTiles;
