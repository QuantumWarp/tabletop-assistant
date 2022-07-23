import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { TemplateSummary } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import TemplateCard from './TemplateCard';
import { useGetTemplatesQuery } from '../../store/api';
import TemplateImportDialog from './TemplateImportDialog';

interface TemplateListProps {
  filter: string;
}

const TemplateList = ({ filter }: TemplateListProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: templates } = useGetTemplatesQuery();
  const [importTemplate, setImportTemplate] = useState<TemplateSummary | undefined>();

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
          tabletopId={tabletopId}
          open={Boolean(importTemplate)}
          onClose={() => setImportTemplate(undefined)}
        />
      )}
    </Grid>
  );
};

export default TemplateList;
