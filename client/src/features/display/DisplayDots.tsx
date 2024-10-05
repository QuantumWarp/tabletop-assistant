import { Box } from '@mui/material';
import FixedActions from '../../helpers/operation.helper';
import { fakeMapping, SlotMapping } from '../../models/slot-mapping';
import './DisplayDots.css';

interface DisplayDotsProps {
  preview: boolean,
  mappings: SlotMapping[],
  onAction: (slot: SlotMapping) => void,
  onOperation: (operation: FixedActions, ...args: SlotMapping[]) => void,
}

const DisplayDots = ({
  preview, mappings, onAction, onOperation,
}: DisplayDotsProps) => {
  const name = mappings.find((x) => x.slotKey === 'name');
  const value = mappings.find((x) => x.slotKey === 'value');
  const maximum = mappings.find((x) => x.slotKey === 'maximum');
  const action = mappings.find((x) => x.slotKey === 'action');

  return (
    <div className={`display-dots ${preview ? 'preview' : ''}`}>
      <span
        className="name"
        onClick={() => action && onAction(action)}
      >
        {name?.value}
      </span>

      {maximum && Array(Number(maximum?.value)).fill(0).map((_x, index) => {
        const filled = index < Number(value?.value || 0);

        return (
          <Box
             
            key={`${index}-${filled}`}
            className="dot"
            sx={{
              border: 1,
              borderColor: 'custom.dot.border',
              backgroundColor: filled ? 'custom.dot.background' : 'none',
            }}
            onClick={() => value && onOperation(
              FixedActions.SetValue,
              value,
              fakeMapping(index === 0 && value?.value === 1 ? 0 : index + 1),
            )}
          />
        );
      })}
    </div>
  );
};

export default DisplayDots;
