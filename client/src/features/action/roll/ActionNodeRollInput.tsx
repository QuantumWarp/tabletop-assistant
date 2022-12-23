import React from 'react';
import { RollCombo } from 'tabletop-assistant-common';
import RollHelper from '../../../helpers/roll.helper';
import './ActionNodeRoll.css';

interface ActionNodeRollInputProps {
  combo: RollCombo;
}

const ActionNodeRollInput = ({ combo }: ActionNodeRollInputProps) => {
  const simplified = RollHelper.simplifyCombo(combo);
  const sorted = simplified.sort(RollHelper.compareComboGroup);

  return (
    <div className="action-roll">
      {sorted.map((x, index) => (
        <span className="face-combo">
          {(index >= 1 || x.negative) && (
            <span className="sign">{x.negative ? '-' : '+'}</span>
          )}

          {!x.static && (
            <>
              <span className="amount">{x.number || '?'}</span>
              <span className="d">d</span>
            </>
          )}

          <span className={x.static ? 'static' : 'faces'}>{x.faces || '?'}</span>
        </span>
      ))}
    </div>
  );
};

export default ActionNodeRollInput;
