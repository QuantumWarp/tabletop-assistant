import { Box } from '@mui/material';
import './DisplayToggle.css';
import FixedActions from '../../helpers/operation.helper';
import { SlotMapping } from '../../models/slot-mapping';

interface DisplayToggleProps {
  preview: boolean,
  mappings: SlotMapping[],
  onAction: (slot: SlotMapping) => void,
  onOperation: (operation: FixedActions, ...args: SlotMapping[]) => void,
}

const DisplayToggle = ({
  preview, mappings, onAction, onOperation,
}: DisplayToggleProps) => {
  const name = mappings.find((x) => x.slotKey === 'name');
  const toggle = mappings.find((x) => x.slotKey === 'toggle');
  const action = mappings.find((x) => x.slotKey === 'action');

  return (
    <div className={`display-toggle ${preview ? 'preview' : ''}`}>
      <Box
        className="dot"
        sx={{
          border: 1,
          borderColor: 'custom.dot.border',
          backgroundColor: toggle?.value ? 'custom.dot.background' : 'none',
        }}
        onClick={() => toggle && onOperation(FixedActions.Toggle, toggle)}
      />

      <div
        className="title"
        onClick={() => action && onAction(action)}
      >
        {name?.value}
      </div>
    </div>
  );
};

export default DisplayToggle;
