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
      {[...node.results].reverse().map((res) => {
        const { min, max } = RollComboHelper.hasMinMax(res);

        return (
          <div
            key={res.map((x) => x.id).join(',')}
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
