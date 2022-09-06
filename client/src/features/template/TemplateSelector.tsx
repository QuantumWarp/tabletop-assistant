import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TemplateImport } from 'tabletop-assistant-common';
import { useGetTemplateSummariesQuery } from '../../store/api';
import TemplateImportDialog from './TemplateImportDialog';

interface TemplateListProps {
  filter: string;
}

const TemplateSelector = ({ filter }: TemplateListProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: summaries } = useGetTemplateSummariesQuery();
  const [importTemplate, setImportTemplate] = useState<TemplateImport | undefined>();

  console.log(tabletopId);

  return (
    <Grid container spacing={6}>
      Template List (
      {filter.length}
      {summaries?.templates.length}
      )

      {importTemplate && (
        <TemplateImportDialog
          templateImport={importTemplate}
          open={Boolean(importTemplate)}
          onClose={() => setImportTemplate(undefined)}
        />
      )}
    </Grid>
  );
};

export default TemplateSelector;
