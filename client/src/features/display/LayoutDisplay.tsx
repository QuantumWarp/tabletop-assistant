import { useState } from 'react';
import {
  CreateEntity, EntityDisplay, ValueMap
} from '@tabletop-assistant/common';
import { Operations, OperationHelper } from '../../helpers/operation.helper';
import { DisplayHelper } from '../../helpers/display.helper';
import { EntitySummaryDialog } from '../entity/EntitySummaryDialog';
import { DisplayCard } from './DisplayCard';
import { DisplayDots } from './DisplayDots';
import { DisplaySquare } from './DisplaySquare';
import { DisplayToggle } from './DisplayToggle';
import { SlotMapping } from '../../models/slot-mapping';

interface LayoutDisplayProps {
  preview?: boolean,
  display: EntityDisplay,
  entity: CreateEntity,
  mappings: ValueMap[],
  onUpdateMappings?: (values: ValueMap[]) => void,
  onAction?: (actionKey: string) => void,
}

export function LayoutDisplay({
  preview, display, entity, mappings,
  onUpdateMappings = () => {}, onAction = () => {},
}: LayoutDisplayProps) {
  const [entitySummaryOpen, setEntitySummaryOpen] = useState(false);

  const slotMappings = [
    ...DisplayHelper.maps(mappings, display, entity),
    ...DisplayHelper.actionMaps(display, entity),
  ];

  const actionHandler = (mapping: SlotMapping) => {
    onAction(mapping.fieldKey);
  };

  const operationHandler = (operation: Operations, ...args: SlotMapping[]) => {
    if (preview) return;

    if (operation === Operations.Detail) {
      setEntitySummaryOpen(true);
      return;
    }

    const updatedMappings = OperationHelper.run(operation, args);
    
    const updateValueMaps = mappings.map((vm) => {
      const slotMapping = updatedMappings.find((x) => vm.fieldKey === x.fieldKey);
      if (!slotMapping) return;
      return { ...vm, value: slotMapping.value };
    }).filter((x) => Boolean(x)) as ValueMap[];

    onUpdateMappings(updateValueMaps);
  };

  return (
    <>
      {display.type === 'card' && (
        <DisplayCard
          preview={Boolean(preview)}
          mappings={slotMappings}
          onAction={actionHandler}
          onOperation={operationHandler}
        />
      )}
      {display.type === 'dots' && (
        <DisplayDots
          preview={Boolean(preview)}
          mappings={slotMappings}
          onAction={actionHandler}
          onOperation={operationHandler}
        />
      )}
      {display.type === 'square' && (
        <DisplaySquare
          preview={Boolean(preview)}
          mappings={slotMappings}
          onOperation={operationHandler}
        />
      )}
      {display.type === 'toggle' && (
        <DisplayToggle
          preview={Boolean(preview)}
          mappings={slotMappings}
          onAction={actionHandler}
          onOperation={operationHandler}
        />
      )}

      {entitySummaryOpen && (
        <EntitySummaryDialog
          entity={entity}
          mappings={mappings}
          open={entitySummaryOpen}
          onSave={onUpdateMappings}
          onClose={() => setEntitySummaryOpen(false)}
        />
      )}
    </>
  );
};
