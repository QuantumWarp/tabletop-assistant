import React, { useState } from 'react';
import { Button } from '@mui/material';
import {
  Casino as RollIcon,
  ArrowRightAlt as ArrowRightIcon,
} from '@mui/icons-material';
import ActionNodeLeft from './ActionNodeLeft';
import ActionNodeRight from './ActionNodeRight';
import './ActionNode.css';
import { ActionTreeNode } from '../helpers/action-tree.helper';
import RollHelper from '../helpers/roll.helper';

interface ActionNodeProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNode = ({ level, node }: ActionNodeProps) => {
  const [updatedNode, setUpdatedNode] = useState(node);

  const rollAction = (rollNode: ActionTreeNode) => {
    if (!rollNode.combo) return;

    const result = RollHelper.roll(rollNode.combo);
    setUpdatedNode({
      ...rollNode,
      results: rollNode.results.concat([result]),
    });
  };

  return (
    <>
      <div className={`action-node${level === 0 ? ' level0' : ''}`}>
        <div className="left">
          <ActionNodeLeft
            level={level}
            node={updatedNode}
            updateNode={(e, rollNow) => {
              if (rollNow) rollAction(e);
              else setUpdatedNode(e);
            }}
          />
        </div>

        <div className="center">
          {updatedNode.combo && (
            <Button
              className="button"
              onClick={() => rollAction(updatedNode)}
            >
              <RollIcon />
              <ArrowRightIcon />
            </Button>
          )}
        </div>

        <div className="right">
          {updatedNode.combo && (
            <ActionNodeRight
              node={updatedNode}
              updateNode={(e) => setUpdatedNode(e)}
            />
          )}
        </div>
      </div>

      {updatedNode.children.map((x) => (
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
