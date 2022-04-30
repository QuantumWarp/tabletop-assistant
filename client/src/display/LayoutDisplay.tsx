import React, { useState } from 'react';
import { CreateEntity } from 'tabletop-assistant-common';
import FixedActions, { ActionHelper, FixedActionArg } from '../helpers/action.helper';
import DisplayHelper from '../helpers/display.helper';
import DisplayType from '../helpers/display.type';
import CardDisplay from '../helpers/displays/card.display';
import DotsDisplay from '../helpers/displays/dots.display';
import SquareDisplay from '../helpers/displays/square.display';
import ToggleDisplay from '../helpers/displays/toggle.display';
import EntitySummaryDialog from '../layout/EntitySummaryDialog';
import DisplayCard from './DisplayCard';
import DisplayDots from './DisplayDots';
import DisplaySquare from './DisplaySquare';
import DisplayToggle from './DisplayToggle';

interface LayoutDisplayProps {
  type: DisplayType,
  preview?: boolean,
  entity: CreateEntity,
  slotMappings?: { [slot: string]: any },
  fieldMappings?: { [field: string]: any },
  onSlot?: (slot: string) => void,
  onUpdateValues?: (values: { [field: string]: any }) => void,
}

const LayoutDisplay = ({
  type, preview, entity, slotMappings, fieldMappings,
  onSlot = () => {}, onUpdateValues = () => {},
}: LayoutDisplayProps) => {
  const [entitySummaryOpen, setEntitySummaryOpen] = useState(false);

  const slotValues = DisplayHelper.map(
    type,
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
    const display = entity.displays.find((x) => x.type === type);
    if (!display) return;

    const mappedArgs = args.map((x) => {
      const field = x.slot ? display.mappings[x.slot] : x.field;
      const value = field ? filledFieldMappings[field] : x.value;
      return { ...x, field, value };
    });

    const updatedValues = ActionHelper.run(operation, mappedArgs);
    onUpdateValues(updatedValues);
  };

  return (
    <>
      {type === DisplayType.Card && (
        <DisplayCard
          preview={Boolean(preview)}
          slots={slotValues as CardDisplay}
          onSlot={onSlot}
          onOperation={runOperation}
        />
      )}
      {type === DisplayType.Dots && (
        <DisplayDots
          preview={Boolean(preview)}
          slots={slotValues as DotsDisplay}
          onSlot={onSlot}
          onOperation={runOperation}
        />
      )}
      {type === DisplayType.Square && (
        <DisplaySquare
          preview={Boolean(preview)}
          slots={slotValues as SquareDisplay}
          onOperation={runOperation}
        />
      )}
      {type === DisplayType.Toggle && (
        <DisplayToggle
          preview={Boolean(preview)}
          slots={slotValues as ToggleDisplay}
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
