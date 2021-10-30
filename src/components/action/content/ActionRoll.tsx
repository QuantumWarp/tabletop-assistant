import React, { useState } from 'react';
import RollCombo, { RollComboHelper } from '../../../models/rolling/roll-combo';
import ActionRollDialog from '../dialogs/ActionRollDialog';
import './ActionRoll.css';

interface ActionRollProps {
  combo: RollCombo;
}

const ActionRoll = ({ combo }: ActionRollProps) => {
  const [editCombo, setEditCombo] = useState<boolean | null>(null);

  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + x.faces, 0);
  const faceComboDict = RollComboHelper.groupByFaces(combo.filter((x) => !x.static));

  return (
    <>
      <div className="action-roll" onClick={() => setEditCombo(true)}>
        <span className="static">{staticValue}</span>
        {Object.keys(faceComboDict).map((x) => (
          <span className="face-combo">
            <span className="sign">+</span>
            <span className="amount">{faceComboDict[Number(x)].length}</span>
            <span className="d">d</span>
            <span className="faces">{Number(x)}</span>
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

export default ActionRoll;
