import React, { useState } from 'react';
import RollCombo, { RollComboHelper } from '../../models/rolling/roll-combo';
import './ActionNode.css';
import ActionRollDialog from './ActionRollDialog';

interface ActionNodeContentProps {
  combo: RollCombo;
}

const ActionNodeContent = ({ combo }: ActionNodeContentProps) => {
  const [editCombo, setEditCombo] = useState<boolean | null>(null);

  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + x.faces, 0);
  const faceComboDict = RollComboHelper.groupByFaces(combo.filter((x) => !x.static));

  return (
    <>
      <div className="action-roll-content" onClick={() => setEditCombo(true)}>
        <span>{staticValue}</span>
        {Object.keys(faceComboDict).map((x) => (
          <span>
            +
            {faceComboDict[Number(x)].length}
            d
            {Number(x)}
          </span>
        ))}
      </div>

      <ActionRollDialog
        combo={combo}
        open={Boolean(editCombo)}
        onClose={() => setEditCombo(false)}
      />
    </>
  );
};

export default ActionNodeContent;
