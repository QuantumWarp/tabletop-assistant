import React from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import RollComboParser from '../../models/rolling/roll-combo-parser';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import './ActionNode.css';
import ActionNodeContent from './ActionRollContent';

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
            {node.action.roll && (
              <ActionNodeContent
                combo={RollComboParser.parse(node.action.roll)}
              />
            )}
          </div>
        </div>

        <div className="button">
          Button
        </div>
      </div>

      {node.children.map((x) => (
        <ActionNode
          key={x.action.id}
          level={level + 1}
          node={x}
        />
      ))}
    </>
  );
};

export default ActionNode;
