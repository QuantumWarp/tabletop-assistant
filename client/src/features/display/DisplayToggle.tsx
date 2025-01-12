import { Box } from '@mui/material';
import { Operations } from '../../helpers/operation.helper';
import { SlotMapping } from '../../models/slot-mapping';
import './DisplayToggle.css';

interface DisplayToggleProps {
  preview: boolean,
  mappings: SlotMapping[],
  onAction: (slot: SlotMapping) => void,
  onOperation: (operation: Operations, ...args: SlotMapping[]) => void,
}

export function DisplayToggle({
  preview, mappings, onAction, onOperation,
}: DisplayToggleProps) {
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
        onClick={() => toggle && onOperation(Operations.Toggle, toggle)}
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
