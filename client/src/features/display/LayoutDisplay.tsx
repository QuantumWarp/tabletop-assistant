import React, { useState } from 'react';
import {
  CreateEntity, EntityDisplay, FieldValueMapping, SlotFieldMapping,
} from 'tabletop-assistant-common';
import FixedActions, { ActionHelper, FixedActionArg } from '../../helpers/action.helper';
import DisplayHelper from '../../helpers/display.helper';
import EntitySummaryDialog from '../layout/EntitySummaryDialog';
import DisplayCard from './DisplayCard';
import DisplayDots from './DisplayDots';
import DisplaySquare from './DisplaySquare';
import DisplayToggle from './DisplayToggle';

interface LayoutDisplayProps {
  preview?: boolean,
  display: EntityDisplay,
  entity: CreateEntity,
  slotMappings?: SlotFieldMapping[],
  fieldMappings?: FieldValueMapping[],
  onSlot?: (slot: string) => void,
  onUpdateValues?: (values: { [field: string]: any }) => void,
}

const LayoutDisplay = ({
  preview, display, entity, slotMappings, fieldMappings,
  onSlot = () => {}, onUpdateValues = () => {},
}: LayoutDisplayProps) => {
  const [entitySummaryOpen, setEntitySummaryOpen] = useState(false);

  const slotValues = DisplayHelper.map(
    display,
    entity,
    slotMappings,
    fieldMappings,
  );

  const runOperation = (operation: FixedActions, ...args: FixedActionArg[]) => {
    if (preview) return;

    if (operation === FixedActions.Detail) {
      setEntitySummaryOpen(true);
      return;
    }

    const filledFieldMappings = DisplayHelper.getFieldMappings(entity, fieldMappings);

    const mappedArgs = args.map((x) => {
      const field = x.slot
        ? display.mappings.find((mapping) => mapping.slotKey === x.slot)?.fieldKey
        : x.field;
      const value = field
        ? filledFieldMappings.find((mapping) => mapping.fieldKey === field)?.value
        : x.value;
      return { ...x, field, value };
    });

    const updatedValues = ActionHelper.run(operation, mappedArgs);
    onUpdateValues(updatedValues);
  };

  return (
    <>
      {display.type === 'card' && (
        <DisplayCard
          preview={Boolean(preview)}
          slots={slotValues}
          onSlot={onSlot}
          onOperation={runOperation}
        />
      )}
      {display.type === 'dots' && (
        <DisplayDots
          preview={Boolean(preview)}
          slots={slotValues}
          onSlot={onSlot}
          onOperation={runOperation}
        />
      )}
      {display.type === 'square' && (
        <DisplaySquare
          preview={Boolean(preview)}
          slots={slotValues}
          onOperation={runOperation}
        />
      )}
      {display.type === 'toggle' && (
        <DisplayToggle
          preview={Boolean(preview)}
          slots={slotValues}
          onSlot={onSlot}
          onOperation={runOperation}
        />
      )}

      {entitySummaryOpen && fieldMappings && (
        <EntitySummaryDialog
          entity={entity}
          fieldMappings={fieldMappings}
          open={entitySummaryOpen}
          onSave={onUpdateValues}
          onClose={() => setEntitySummaryOpen(false)}
        />
      )}
    </>
  );
};

LayoutDisplay.defaultProps = {
  preview: undefined,
  slotMappings: undefined,
  fieldMappings: undefined,
  onSlot: () => {},
  onUpdateValues: () => {},
};

export default LayoutDisplay;
