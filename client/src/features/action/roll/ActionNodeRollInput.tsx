import React from 'react';
import { RollCombo } from 'tabletop-assistant-common';
import './ActionNodeRoll.css';

interface ActionNodeRollInputProps {
  combo: RollCombo;
}

const ActionNodeRollInput = ({ combo }: ActionNodeRollInputProps) => {
  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + x.faces, 0);

  return (
    <div className="action-roll">
      {staticValue !== 0 && (
        <span className="static">{staticValue}</span>
      )}

      {combo
        .filter((x) => !x.static)
        .sort((a, b) => a.faces - b.faces)
        .map((x, index) => (
          <span className="face-combo">
            {(index >= 1 || staticValue !== 0 || x.negative) && (
              <span className="sign">{x.negative ? '-' : '+'}</span>
            )}

            <span className="amount">{x.number}</span>
            <span className="d">d</span>
            <span className="faces">{x.faces}</span>
          </span>
        ))}
    </div>
  );
};

export default ActionNodeRollInput;
