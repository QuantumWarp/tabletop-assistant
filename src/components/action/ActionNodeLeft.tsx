import React, { useState } from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import RollComboParser from '../../models/rolling/roll-combo-parser';
import { selectObjects } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';
import TabletopIcon from '../common/TabletopIcon';
import ActionRoll from './content/ActionRoll';
import './ActionNodeLeft.css';
import ActionRollDialog from './dialogs/ActionRollDialog';

interface ActionNodeLeftProps {
  level: number;
  node: ActionTreeNode;
}

const ActionNodeLeft = ({ level, node }: ActionNodeLeftProps) => {
  const objects = useAppSelector(selectObjects);
  const [editCombo, setEditCombo] = useState<boolean | null>(null);
  const obj = objects.find((x) => x.id === node.action.objectId);
  const icon = node.action.icon || obj?.icon;

  return (
    <>
      <div
        className="action-node-left"
        style={{ marginLeft: `${level * 20}px` }}
        onClick={() => node.action.roll && setEditCombo(true)}
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
            {node.action.roll && (
              <ActionRoll combo={RollComboParser.parse(node.action.roll, node.action.id)} />
            )}
          </div>
        </div>
      </div>

      {node.action.roll && editCombo && (
        <ActionRollDialog
          combo={RollComboParser.parse(node.action.roll, node.action.id)}
          open={Boolean(editCombo)}
          onClose={() => setEditCombo(false)}
        />
      )}
    </>
  );
};

export default ActionNodeLeft;
