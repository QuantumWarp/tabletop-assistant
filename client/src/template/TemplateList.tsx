import React from 'react';
import { Grid } from '@mui/material';
import TemplateCard from './TemplateCard';
import { useGetTemplatesQuery } from '../store/api';

interface NotesListProps {
  filter: string;
}

const NoteList = ({ filter }: NotesListProps) => {
  const { data: templates } = useGetTemplatesQuery();

  const filteredTemplates = templates
    ? templates.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedTemplates = filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Grid container spacing={6}>
      {sortedTemplates.map((template) => (
        <Grid key={template._id} item xs={4}>
          <TemplateCard
            template={template}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NoteList;
