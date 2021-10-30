import React from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import RollComboParser from '../../models/rolling/roll-combo-parser';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import ActionRoll from './content/ActionRoll';
import './ActionNodeLeft.css';

interface ActionNodeLeftProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNodeLeft = ({ level, node }: ActionNodeLeftProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const gameObject = gameObjects.find((x) => x.id === node.action.objectId);
  const icon = node.action.icon || gameObject?.icon;

  return (
    <div
      className="action-node-left"
      style={{ marginLeft: `${level * 20}px` }}
    >
      {icon && (
        <div className="icon">
          <TabletopIcon icon={icon} />
        </div>
      )}

      <div className="content">
        <div className="title">
          {gameObject?.name}
          {' - '}
          {node.action.name}
        </div>

        <div className="detail">
          {node.action.roll && (
            <ActionRoll combo={RollComboParser.parse(node.action.roll, node.action.id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionNodeLeft;
