import React from 'react';
import {
  Grid,
} from '@mui/material';
import { TemplateEntity, TemplateGroup, TemplateLayout } from 'tabletop-assistant-common';
import { useGetTemplateSummaryQuery } from '../../store/api';
import TemplateGroupList from './TemplateGroupList';
import TemplateLayoutList from './TemplateLayoutList';
import TemplateEntityList from './TemplateEntityList';

interface TemplateListProps {
  filter: string;

  groupIds: string[];
  layoutIds: string[];
  entityIds: string[];

  onGroupClick: (group: TemplateGroup, selected: boolean) => void;
  onLayoutClick: (layout: TemplateLayout, selected: boolean) => void;
  onEntityClick: (entity: TemplateEntity, selected: boolean) => void;
}

const TemplateSelector = ({
  filter,
  groupIds, layoutIds, entityIds,
  onGroupClick, onLayoutClick, onEntityClick,
}: TemplateListProps) => {
  const { data: summary } = useGetTemplateSummaryQuery('');

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <TemplateGroupList
          groups={summary?.groups || []}
          selectedIds={groupIds}
          filter={filter}
          onChange={(group, selected) => onGroupClick(group, selected)}
        />
      </Grid>

      <Grid item xs={4}>
        <TemplateLayoutList
          layouts={summary?.layouts || []}
          selectedIds={layoutIds}
          filter={filter}
          onChange={(layout, selected) => onLayoutClick(layout, selected)}
        />
      </Grid>

      <Grid item xs={4}>
        <TemplateEntityList
          entities={summary?.entities || []}
          selectedIds={entityIds}
          filter={filter}
          onChange={(entity, selected) => onEntityClick(entity, selected)}
        />
      </Grid>
    </Grid>
  );
};

export default TemplateSelector;
