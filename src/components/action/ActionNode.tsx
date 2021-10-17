import React from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const gameObject = gameObjects.find((x) => x.id === node.action.objectId);

  return (
    <div>
      <span>
        {level}
        {gameObject?.name}
        {' - '}
        {node.action.name}
      </span>

      {node.children.map((x) => (
        <ActionNode
          level={level + 1}
          node={x}
        />
      ))}
    </div>
  );
};

export default ActionNode;
