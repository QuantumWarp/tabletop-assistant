import React from 'react';
import ActionNode from '../../components/action/ActionNode';
import { selectActionTree } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import './ActionPage.css';

const ActionPage = () => {
  const actionTree = useAppSelector(selectActionTree);

  return (
    <div className="action-page">
      {actionTree.map((x) => (
        <ActionNode node={x} />
      ))}
    </div>
  );
};

export default ActionPage;
