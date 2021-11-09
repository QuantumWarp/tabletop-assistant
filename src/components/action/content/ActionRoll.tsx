import React from 'react';
import RollCombo, { RollComboHelper } from '../../../models/rolling/roll-combo';
import './ActionRoll.css';

interface ActionRollProps {
  combo: RollCombo;
}

const ActionRoll = ({ combo }: ActionRollProps) => {
  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + x.faces, 0);
  const faceComboDict = RollComboHelper.groupByFaces(combo.filter((x) => !x.static));

  return (
    <div className="action-roll">
      <span className="static">{staticValue}</span>
      {Object.keys(faceComboDict)
        .sort((a, b) => Math.abs(Number(a)) - Math.abs(Number(b)))
        .map((x) => (
          <span
            key={faceComboDict[Number(x)].map((entry) => entry.id).join(',')}
            className="face-combo"
          >
            <span className="sign">{Number(x) < 0 ? '-' : '+'}</span>
            <span className="amount">{faceComboDict[Number(x)].length}</span>
            <span className="d">d</span>
            <span className="faces">{Math.abs(Number(x))}</span>
          </span>
        ))}
    </div>
  );
};

export default ActionRoll;
