import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Template } from 'tabletop-assistant-common';
import TemplateCard from './TemplateCard';
import { useGetTemplatesQuery } from '../store/api';
import TemplateImportDialog from './TemplateImportDialog';

interface TemplateListProps {
  filter: string;
}

const TemplateList = ({ filter }: TemplateListProps) => {
  const { data: templates } = useGetTemplatesQuery();
  const [importTemplate, setImportTemplate] = useState<Template | undefined>();

  const filteredTemplates = templates
    ? templates.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase())) : [];
  const sortedTemplates = filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Grid container spacing={6}>
      {sortedTemplates.map((template) => (
        <Grid key={template._id} item xs={4}>
          <TemplateCard
            template={template}
            onClick={() => setImportTemplate(template)}
          />
        </Grid>
      ))}

      {importTemplate && (
        <TemplateImportDialog
          template={importTemplate}
          open={Boolean(importTemplate)}
          onClose={() => setImportTemplate(undefined)}
        />
      )}
    </Grid>
  );
};

export default TemplateList;
