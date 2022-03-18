import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ActionNode from './ActionNode';
import TopBar from '../common/TopBar';
import { clearAction, selectActionTree } from '../store/config-slice';
import { useAppDispatch, useAppSelector } from '../store/store';

const ActionPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const actionTree = useAppSelector(selectActionTree);

  return (
    <>
      <TopBar title="Action">
        <Box />

        {actionTree.length > 0 && (
          <Button
            variant="outlined"
            sx={{ float: 'right' }}
            onClick={() => { dispatch(clearAction()); history.push('./layout'); }}
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