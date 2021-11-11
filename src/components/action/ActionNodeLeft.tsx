import React, { useState } from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import { rollAction, selectObjects, setupRollAction } from '../../store/config-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import ActionRoll from './content/ActionRoll';
import './ActionNodeLeft.css';
import ActionRollDialog from './dialogs/ActionRollDialog';
import RollCombo from '../../models/rolling/roll-combo';

interface ActionNodeLeftProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNodeLeft = ({ level, node }: ActionNodeLeftProps) => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(selectObjects);
  const [editCombo, setEditCombo] = useState<boolean | null>(null);
  const obj = objects.find((x) => x.id === node.action.objectId);
  const icon = node.action.icon || obj?.icon;

  const handleRollUpdate = (updatedCombo?: RollCombo, rollNow?: boolean) => {
    if (updatedCombo) dispatch(setupRollAction({ actionId: node.action.id, combo: updatedCombo }));
    if (rollNow) dispatch(rollAction(node.action.id));
    setEditCombo(false);
  };

  return (
    <>
      <div
        className="action-node-left"
        style={{ marginLeft: `${level * 20}px` }}
        onClick={() => node.combo && setEditCombo(true)}
      >
        {icon && (
          <div className="icon">
            <TabletopIcon icon={icon} />
          </div>
        )}

        <div className="content">
          <div className="title">
            {obj?.name}
            {' - '}
            {node.action.name}
          </div>

          <div className="detail">
            {node.combo && (
              <ActionRoll combo={node.combo} />
            )}
          </div>
        </div>
      </div>

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
