import React from 'react';
import { Button } from '@mui/material';
import {
  Casino as RollIcon,
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import ActionNodeLeft from './ActionNodeLeft';
import ActionNodeRight from './ActionNodeRight';
import './ActionNode.css';
import { ActionTreeNode } from '../helpers/action-tree.helper';
import { RollComboHelper } from '../models/rolling/roll-combo';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const rollAction = () => {
    if (!node.combo) return;

    const result = RollComboHelper.roll(node.combo);
    node.results.push(result);
  };

  return (
    <>
      <div className={`action-node${level === 0 ? ' level0' : ''}`}>
        <div className="left">
          <ActionNodeLeft level={level} node={node} />
        </div>

        <div className="center">
          {node.combo && (
            <Button
              className="button"
              onClick={() => rollAction()}
            >
              <RollIcon />
              <ArrowRightIcon />
            </Button>
          )}
        </div>

        <div className="right">
          {node.combo && (
            <ActionNodeRight node={node} />
          )}
        </div>
      </div>

      {node.children.map((x) => (
        <ActionNode
          key={`${x.entityId}-${x.actionKey}`}
          level={level + 1}
          node={x}
        />
      ))}
    </>
  );
};

export default ActionNode;
