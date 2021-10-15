import React from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';

interface ActionNodeProps {
  node: ActionTreeNode;
}

const ActionNode = ({ node }: ActionNodeProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const gameObject = gameObjects.find((x) => x.id === node.action.objectId);

  return (
    <div>
      <span>
        {gameObject?.name}
        {' - '}
        {node.action.name}
      </span>

      {node.children.map((x) => (
        <ActionNode node={x} />
      ))}
    </div>
  );
};

export default ActionNode;
