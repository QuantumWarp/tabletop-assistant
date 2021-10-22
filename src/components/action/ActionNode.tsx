import React from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import './ActionNode.css';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const gameObject = gameObjects.find((x) => x.id === node.action.objectId);

  return (
    <>
      <div
        style={{ marginLeft: `${level * 20}px` }}
        className="action-node"
      >
        <div className="icon">Icon</div>

        <div className="middle">
          <div className="title">
            {gameObject?.name}
            {' - '}
            {node.action.name}
          </div>

          <div className="content">
            Action Node Content
          </div>
        </div>

        <div className="button">
          Button
        </div>
      </div>

      {node.children.map((x) => (
        <ActionNode
          level={level + 1}
          node={x}
        />
      ))}
    </>
  );
};

export default ActionNode;
