import { Button, Container } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ActionNode from '../../components/action/ActionNode';
import TopBar from '../../components/common/TopBar';
import { clearAction, selectActionTree } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';

const ActionPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const actionTree = useAppSelector(selectActionTree);

  return (
    <>
      <TopBar title="Action">
        {actionTree.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => { dispatch(clearAction()); history.push('./layout'); }}
          >
            Finish
          </Button>
        )}
      </TopBar>

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
    </>
  );
};

export default ActionPage;
