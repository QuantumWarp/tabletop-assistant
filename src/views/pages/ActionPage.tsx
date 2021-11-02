import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ActionNode from '../../components/action/ActionNode';
import TopBar from '../../components/common/TopBar';
import { clearAction, selectActionTree } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './ActionPage.css';

const ActionPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const actionTree = useAppSelector(selectActionTree);

  return (
    <div className="action-page">
      <TopBar title="Action">
        <div className="action-controls">
          <Button
            variant="outlined"
          >
            Custom Roll
          </Button>

          {actionTree.length > 0 && (
            <Button
              variant="outlined"
              onClick={() => { dispatch(clearAction()); history.push('./layout'); }}
            >
              Finish
            </Button>
          )}
        </div>
      </TopBar>

      <div className="action-content">
        {actionTree.map((x) => (
          <ActionNode
            key={x.action.id}
            level={0}
            node={x}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionPage;
