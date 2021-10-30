import React, { useState } from 'react';
import { ActionTreeNode } from '../../models/objects/action-tree';
import RollCombo, { RollComboHelper } from '../../models/rolling/roll-combo';
import './ActionNodeRight.css';
import ActionRollResultDialog from './dialogs/ActionRollResultDialog';

interface ActionNodeRightProps {
  node: ActionTreeNode;
}

const ActionNodeRight = ({ node }: ActionNodeRightProps) => {
  const [editComboResult, setEditComboResult] = useState<RollCombo | null>(null);

  return (
    <div className="action-node-right">
      {[...node.results].reverse().map((res, index) => {
        const { min, max } = RollComboHelper.hasMinMax(res);

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`result${min ? ' min' : ''}${max ? ' max' : ''}`}
            onClick={() => setEditComboResult(res)}
          >
            {RollComboHelper.totalValue(res)}
          </div>
        );
      })}

      {editComboResult && (
        <ActionRollResultDialog
          combo={editComboResult}
          open={Boolean(editComboResult)}
          onClose={() => setEditComboResult(null)}
        />
      )}
    </div>
  );
};

export default ActionNodeRight;
