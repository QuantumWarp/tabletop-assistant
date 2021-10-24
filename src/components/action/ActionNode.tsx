import React from 'react';
import { Button } from '@mui/material';
import {
  Casino as RollIcon,
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import { ActionTreeNode } from '../../models/objects/action-tree';
import RollComboParser from '../../models/rolling/roll-combo-parser';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import './ActionNode.css';
import ActionNodeContent from './ActionRollContent';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const gameObject = gameObjects.find((x) => x.id === node.action.objectId);
  const icon = node.action.icon || gameObject?.icon;

  return (
    <>
      <div
        style={{ marginLeft: `${level * 20}px` }}
        className="action-node"
      >
        {icon && (
          <div className="icon">
            <TabletopIcon icon={icon} />
          </div>
        )}

        <div className="middle">
          <div className="title">
            {gameObject?.name}
            {' - '}
            {node.action.name}
          </div>

          <div className="content">
            {node.action.roll && (
              <ActionNodeContent
                combo={RollComboParser.parse(node.action.roll, node.action.id)}
              />
            )}
          </div>
        </div>

        {node.action.roll && (
          <Button className="button">
            <RollIcon className="roll" />
            <ArrowRightIcon className="arrow" />
          </Button>
        )}
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
