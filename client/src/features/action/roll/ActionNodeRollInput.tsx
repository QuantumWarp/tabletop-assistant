import { Box } from '@mui/material';
import { RollCombo, RollComboGroup } from '@tabletop-assistant/common';
import RollHelper from '../../../helpers/roll.helper';
import './ActionNodeRoll.css';

interface ActionNodeRollInputProps {
  combo: RollCombo;
  selected?: RollComboGroup;
  onGroupClick?: (group: RollComboGroup) => void;
}

const ActionNodeRollInput = ({
  combo, selected, onGroupClick,
}: ActionNodeRollInputProps) => {
  const simplified = RollHelper.simplifyCombo(combo);
  const sorted = simplified.sort(RollHelper.compareComboGroup);

  return (
    <div className="action-roll">
      {sorted.length === 0 && (<span>0</span>)}
      {sorted.map((x, index) => (
        <Box
          key={RollHelper.stringRepresentation([x])}
          className="face-combo"
          onClick={() => onGroupClick && onGroupClick(x)}
          sx={{
            ...(onGroupClick ? { '&:hover': { backgroundColor: 'action.hover' } } : {}),
            ...(selected === x ? { backgroundColor: 'action.selected' } : {}),
          }}
        >
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
        </Box>
      ))}
    </div>
  );
};

ActionNodeRollInput.defaultProps = {
  selected: undefined,
  onGroupClick: undefined,
};

export default ActionNodeRollInput;
