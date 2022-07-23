import React, { useState } from 'react';
import { Box } from '@mui/material';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionTreeNode from '../../../models/action-tree-node';
import DisplayHelper from '../../../helpers/display.helper';
import '../common/ActionNode.css';
import EntitySummaryDialog from '../../layout/EntitySummaryDialog';
import ActionNodeOutput from '../common/ActionNodeOutput';

interface ActionNodeInfoProps {
  node: ActionTreeNode;
}

const ActionNodeInfo = ({ node }: ActionNodeInfoProps) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Box className="action-node">
        <ActionNodeInput
          node={node}
          onClick={() => setInfoOpen(true)}
        >
          {node.entity.description}
        </ActionNodeInput>

        <ActionNodeCenter noOutput />

        <ActionNodeOutput node={node} />
      </Box>

      {infoOpen && (
        <EntitySummaryDialog
          open={infoOpen}
          entity={node.entity}
          fieldMappings={DisplayHelper.getFieldMappings(node.entity)}
          onClose={() => setInfoOpen(false)}
        />
      )}
    </>
  );
};

export default ActionNodeInfo;
