import React, { useState } from 'react';
import RollCombo from '../../models/rolling/roll-combo';
import ActionRollDialog from './ActionRollDialog';
import './ActionRollResult.css';

interface ActionRollResultProps {
  expanded: boolean;
  combo: RollCombo;
  onClick: () => void;
}

const ActionRollResult = ({ expanded, combo, onClick }: ActionRollResultProps) => {
  const [editCombo, setEditCombo] = useState<boolean | null>(null);

  const staticValue = combo.filter((x) => x.static).reduce((sum, x) => sum + (x.result || 0), 0);
  const totalValue = combo.reduce((sum, x) => sum + (x.result || 0), 0);

  return (
    <>
      <div
        className="action-roll-result"
        onClick={() => !expanded && onClick()}
      >
        {!expanded && (
          <span className="total">{totalValue}</span>
        )}

        {expanded && (
          <>
            <span className="static">{staticValue}</span>
            {combo.filter((x) => !x.static).map((x) => (
              <span className="combo">
                <span className="sign">+</span>
                <span
                  className={`result${x.result === 1 ? ' lowest' : ''}${x.result === x.faces ? ' highest' : ''}`}
                  title={`A ${x.result} was rolled on a d${x.faces}`}
                >
                  {x.result}
                </span>
              </span>
            ))}
          </>
        )}
      </div>

      <ActionRollDialog
        combo={combo}
        open={Boolean(editCombo)}
        onClose={() => setEditCombo(false)}
      />
    </>
  );
};

export default ActionRollResult;
