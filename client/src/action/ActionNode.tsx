import React from 'react';
import { Button } from '@mui/material';
import {
  Casino as RollIcon,
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import { ActionTreeNode } from '../models/objects/action-tree';
import { rollAction } from '../store/config-slice';
import { useAppDispatch } from '../store/store';
import ActionNodeLeft from './ActionNodeLeft';
import ActionNodeRight from './ActionNodeRight';
import './ActionNode.css';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const dispatch = useAppDispatch();

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
              onClick={() => dispatch(rollAction(node.action.id))}
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
          key={x.action.id}
          level={level + 1}
          node={x}
        />
      ))}
    </>
  );
};

export default ActionNode;
