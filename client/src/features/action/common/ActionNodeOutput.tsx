import { Box } from '@mui/material';
import './ActionNode.css';
import ActionTreeHelper from '../../../helpers/action-tree.helper';
import ActionTreeNode from '../../../models/action-tree-node';

interface ActionNodeOutputProps {
  node: ActionTreeNode,
  children?: React.ReactNode;
  onClick?: () => void;
}

const ActionNodeOutput = ({
  node, children, onClick,
}: ActionNodeOutputProps) => (
  <>
    {!ActionTreeHelper.hasOutput(node) && <Box className="action-node-output-spacer" />}

    {ActionTreeHelper.hasOutput(node) && (
      <Box
        className={[
          'action-node-output',
          ActionTreeHelper.hasOutput(node.previous) && 'has-previous',
          ActionTreeHelper.hasOutput(node.next) && 'has-next',
        ].join(' ')}
        sx={{
          borderColor: 'custom.action.border',
          backgroundColor: 'custom.action.background',
        }}
        onClick={onClick}
      >
        {children}
      </Box>
    )}
  </>
);

ActionNodeOutput.defaultProps = {
  children: null,
  onClick: () => {},
};

export default ActionNodeOutput;
