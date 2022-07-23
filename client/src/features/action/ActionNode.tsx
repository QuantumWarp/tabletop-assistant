import React from 'react';
import ActionTreeNode from '../../models/action-tree-node';
import ActionNodeInfo from './info/ActionNodeInfo';
import ActionNodeMacro from './macro/ActionNodeMacro';
import ActionNodeRoll from './roll/ActionNodeRoll';

interface ActionNodeProps {
  node: ActionTreeNode;
}

const ActionNode = ({ node }: ActionNodeProps) => (
  <>
    {node.action.roll && <ActionNodeRoll node={node} />}
    {node.action.macros && <ActionNodeMacro node={node} />}
    {!node.action.roll && !node.action.macros && <ActionNodeInfo node={node} />}

    {node.children.map((x) => (
      <ActionNode
        key={`${x.entity._id}-${x.action.key}`}
        node={x}
      />
    ))}
  </>
);

export default ActionNode;
