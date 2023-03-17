import React, { useState } from 'react';
import {
  Button, Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { TemplateEntity, TemplateLayout } from 'tabletop-assistant-common';
import { useGetTemplateSummaryQuery } from '../../store/api';
import TemplateImportDialog from './TemplateImportDialog';
import TemplatedLayoutList from './TemplatedLayoutList';
import TemplatedEntityList from './TemplatedEntityList';

interface TemplateListProps {
  filter: string;
}

const TemplateSelector = ({ filter }: TemplateListProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: summary } = useGetTemplateSummaryQuery('');
  const [templateImportDialog, setTemplateImportDialog] = useState(false);

  const [layoutIds, setLayoutIds] = useState<string[]>([]);
  const [entityIds, setEntityIds] = useState<string[]>([]);

  const layoutHandler = (layout: TemplateLayout, selected: boolean) => {
    const newIdList = selected
      ? layoutIds.concat([layout._id])
      : layoutIds.filter((x) => x !== layout._id);
    setLayoutIds(newIdList);
  };

  const entityHandler = (entity: TemplateEntity, selected: boolean) => {
    const newIdList = selected
      ? entityIds.concat([entity._id])
      : entityIds.filter((x) => x !== entity._id);
    setEntityIds(newIdList);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => { setLayoutIds([]); setEntityIds([]); }}
        >
          Clear
        </Button>

        <Button
          variant="outlined"
          onClick={() => setTemplateImportDialog(true)}
        >
          Import
        </Button>
      </Grid>

      <Grid item xs={4}>
        <TemplatedLayoutList
          layouts={summary?.layouts || []}
          selectedIds={layoutIds}
          filter={filter}
          onChange={layoutHandler}
        />
      </Grid>

      <Grid item xs={4}>
        <TemplatedEntityList
          entities={summary?.entities || []}
          selectedIds={entityIds}
          filter={filter}
          onChange={entityHandler}
        />
      </Grid>

      {templateImportDialog && (
        <TemplateImportDialog
          templateImport={{ tabletopId, layoutIds, entityIds }}
          open={templateImportDialog}
          onClose={() => setTemplateImportDialog(false)}
        />
      )}
    </Grid>
  );
};

export default TemplateSelector;
