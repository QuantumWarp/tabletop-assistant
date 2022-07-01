import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ActionNode from './ActionNode';
import TopBar from '../common/TopBar';
import { ActionTreeHelper } from '../helpers/action-tree.helper';
import { useGetAllValuesQuery, useGetEntitiesQuery } from '../store/api';

const ActionPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: values } = useGetAllValuesQuery(tabletopId);
  const history = useHistory();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entityId = params.get('entity');
  const actionKey = params.get('action');

  const actionTree = entityId && actionKey && entities && values
    && ActionTreeHelper.createActionTree(entityId, actionKey, entities, values);

  return (
    <>
      <TopBar title="Action">
        <Box />
        {actionTree && actionTree.length > 0 && (
          <Button
            variant="outlined"
            sx={{ float: 'right' }}
            onClick={() => history.push('./layout')}
          >
            Finish
          </Button>
        )}
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container
          sx={{
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          maxWidth="lg"
        >
          {actionTree && actionTree.map((x) => (
            <ActionNode
              key={`${x.entityId}-${x.actionKey}`}
              level={0}
              node={x}
            />
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ActionPage;
