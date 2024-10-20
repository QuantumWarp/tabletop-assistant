import { Box, Button, Container } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ActionNode from '../features/action/ActionNode';
import TopBar from '../components/TopBar';
import { useGetEntitiesQuery } from '../store/api';
import ActionTreeBuilder from '../helpers/action-tree.builder';

const ActionPage = () => {
  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entityId = params.get('entity');
  const actionKey = params.get('action');

  const actionTree = entityId && actionKey && entities
    && new ActionTreeBuilder(entities)
      .build(entityId, actionKey);

  return (
    <>
      <TopBar title="Action">
        <Box />
        {actionTree && actionTree.length > 0 && (
          <Button
            variant="outlined"
            sx={{ float: 'right' }}
            onClick={() => navigate('./layout')}
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
              key={`${x.entity.id}-${x.action.key}`}
              node={x}
            />
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ActionPage;
