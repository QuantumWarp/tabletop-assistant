import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import ActionRoll from './content/ActionRoll';
import './ActionNodeLeft.css';
import ActionRollDialog from './dialogs/ActionRollDialog';
// import RollCombo from '../models/rolling/roll-combo';
import { ActionTreeNode } from '../helpers/action-tree.helper';
import { useGetEntitiesQuery } from '../store/api';

interface ActionNodeLeftProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNodeLeft = ({ level, node }: ActionNodeLeftProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  const [editCombo, setEditCombo] = useState<boolean | null>(null);

  const entity = entities?.find((x) => x._id === node.entityId);
  const action = entity?.actions.find((x) => x.key === node.actionKey);

  const handleRollUpdate = (
    // updatedCombo?: RollCombo, rollNow?: boolean
  ) => {
    // if (updatedCombo) setupRollAction({ actionId: node.action.id, combo: updatedCombo });
    // if (rollNow) rollAction(node.action.id);
    setEditCombo(false);
  };

  return (
    <>
      <Box
        className="action-node-left"
        sx={{
          borderColor: 'custom.action.border',
          backgroundColor: 'custom.action.background',
          ml: `${level * 20}px`,
        }}
        onClick={() => node.combo && setEditCombo(true)}
      >
        {entity?.icon && (
          <>
            <div className="icon">
              <Icon icon={entity.icon} />
            </div>

            <Divider orientation="vertical" />
          </>
        )}

        <div className="content">
          <div className="title">
            {entity?.name}
            {` - ${action?.name}`}
          </div>

          <div className="detail">
            {node.combo && (
              <ActionRoll combo={node.combo} />
            )}
          </div>
        </div>
      </Box>

      {node.combo && editCombo && (
        <ActionRollDialog
          combo={node.combo}
          open={Boolean(editCombo)}
          onClose={handleRollUpdate}
        />
      )}
    </>
  );
};

export default ActionNodeLeft;
