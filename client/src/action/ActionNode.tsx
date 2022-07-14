import React from 'react';
import { ActionTreeNode } from '../helpers/action-tree.helper';
import ActionNodeRoll from './roll/ActionNodeRoll';

interface ActionNodeProps {
  node: ActionTreeNode;
}

const ActionNode = ({ node }: ActionNodeProps) => (
  <>
    {node.action.roll && <ActionNodeRoll node={node} />}
    {node.action.macros && <div>Macro</div>}
    {!node.action.roll && !node.action.macros && <div>Info</div>}

    {node.children.map((x) => (
      <ActionNode
        key={`${x.entity._id}-${x.action.key}`}
        node={x}
      />
    ))}
  </>
);

export default ActionNode;
