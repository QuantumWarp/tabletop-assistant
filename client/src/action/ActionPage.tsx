import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ActionNode from './ActionNode';
import TopBar from '../common/TopBar';
import { ActionHelper } from '../helpers/action.helper';
import { useGetEntitiesQuery } from '../store/api';

const ActionPage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const history = useHistory();

  const actionTree = ActionHelper.createActionTree(
    searchParams.get('entityId'),
    searchParams.get('actionKey'),
    entities,
  );

  return (
    <>
      <TopBar title="Action">
        <Box />

        {actionTree.length > 0 && (
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
          {actionTree.map((x) => (
            <ActionNode
              key={x.action.id}
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
function useSearchParams(): [any, any] {
  throw new Error('Function not implemented.');
}

