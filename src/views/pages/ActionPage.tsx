import { Button } from '@mui/material';
import React from 'react';
import ActionNode from '../../components/action/ActionNode';
import TopBar from '../../components/common/TopBar';
import { selectActionTree } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import './ActionPage.css';

const ActionPage = () => {
  const actionTree = useAppSelector(selectActionTree);

  return (
    <div className="action-page">
      <TopBar title="Action">
        <div className="action-controls">
          <Button
            variant="outlined"
          >
            Finished
          </Button>
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
