import React from 'react';
import { Box, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import ActionTreeNode from '../../../models/action-tree-node';
import './ActionNode.css';
import ActionTreeHelper from '../../../helpers/action-tree.helper';

interface ActionNodeInputProps {
  node: ActionTreeNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionNodeInput = ({
  node, children, onClick,
}: ActionNodeInputProps) => (
  <Box
    className={[
      'action-node-input',
      ActionTreeHelper.isBelow(node, node.previous) && 'round-previous',
      ActionTreeHelper.isBelow(node, node.next) && 'round-next',
    ].join(' ')}
    sx={{
      borderColor: 'custom.action.border',
      backgroundColor: 'custom.action.background',
      ml: `${node.level * 20}px`,
    }}
    onClick={onClick}
  >
    {node.entity.icon && (
      <>
        <div className="icon">
          <Icon icon={node.entity.icon} />
        </div>

        <Divider orientation="vertical" />
      </>
    )}

    <div className="content">
      <div className="header">
        <span>{node.entity.name}</span>
        <span>{' - '}</span>
        <span>{node.action.name}</span>
      </div>

      <div className="detail">
        {children}
      </div>
    </div>
  </Box>
);

ActionNodeInput.defaultProps = {
  onClick: () => {},
};

export default ActionNodeInput;
