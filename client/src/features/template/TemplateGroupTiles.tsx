import React from 'react';
import { TemplateGroup } from 'tabletop-assistant-common';
import { Grid } from '@mui/material';
import { useGetTemplateSummaryQuery } from '../../store/api';
import TemplateGroupCard from './TemplateGroupCard';

interface TemplateGroupTilesProps {
  templateRootId: string;
  onChange: (group: TemplateGroup, selected: boolean) => void;
}

const TemplateGroupTiles = ({ templateRootId, onChange }: TemplateGroupTilesProps) => {
  const { data: summary } = useGetTemplateSummaryQuery(templateRootId);

  return (
    <Grid container spacing={6}>
      {summary && summary.groups.map((group) => (
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
