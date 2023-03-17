import React from 'react';
import { TemplateRoot } from 'tabletop-assistant-common';
import { Grid } from '@mui/material';
import { useGetTemplateRootsQuery } from '../../store/api';
import TemplateRootCard from './TemplateRootCard';

interface TemplateRootListProps {
  onChange: (templateRoot: TemplateRoot) => void;
}

const TemplateRootList = ({ onChange }: TemplateRootListProps) => {
  const { data: templateRoots } = useGetTemplateRootsQuery();

  return (
    <Grid container spacing={6}>
      {templateRoots && templateRoots.map((templateRoot) => (
        <Grid key={templateRoot._id} item xs={4}>
          <TemplateRootCard
            templateRoot={templateRoot}
            onClick={() => onChange(templateRoot)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateRootList;
