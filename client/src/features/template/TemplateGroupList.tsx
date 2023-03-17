import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useGetTemplateSummaryQuery } from '../../store/api';
import TemplateGroupCard from './TemplateGroupCard';

interface TemplateGroupListProps {
  templateRootId: string;
}

const TemplateGroupList = ({ templateRootId }: TemplateGroupListProps) => {
  const history = useHistory();
  const { data: summary } = useGetTemplateSummaryQuery(templateRootId);

  return (
    <Grid container spacing={6}>
      {summary && summary.groups.map((group) => (
        <Grid key={group._id} item xs={4}>
          <TemplateGroupCard
            templateGroup={group}
            onClick={() => history.push(`/templates?templateGroup=${group._id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplateGroupList;
