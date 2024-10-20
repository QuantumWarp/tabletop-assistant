import { useState } from 'react';
import { Box } from '@mui/material';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionTreeNode from '../../../models/action-tree-node';
import '../common/ActionNode.css';
import EntitySummaryDialog from '../../entity-instance/EntityInstanceDialog';
import ActionNodeOutput from '../common/ActionNodeOutput';
import { useMappingEntity } from '../../../helpers/hooks/use-mapping-entities';

interface ActionNodeInfoProps {
  node: ActionTreeNode;
}

const ActionNodeInfo = ({ node }: ActionNodeInfoProps) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const entityMappings = useMappingEntity(node.entity.id);

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

      {infoOpen && entityMappings && (
        <EntitySummaryDialog
          open={infoOpen}
          entity={node.entity}
          mappings={entityMappings}
          onClose={() => setInfoOpen(false)}
        />
      )}
    </>
  );
};

export default ActionNodeInfo;
