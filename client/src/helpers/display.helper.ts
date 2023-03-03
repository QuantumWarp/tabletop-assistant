import {
  CreateEntity, EntityAction, EntityDisplay, EntityDisplayType,
  EntityField, FieldValueMapping, SlotFieldMapping,
} from 'tabletop-assistant-common';
import { slots as dotsSlots } from './displays/dots.display';
import { slots as squareSlots } from './displays/square.display';
import { slots as cardSlots } from './displays/card.display';
import { slots as toggleSlots } from './displays/toggle.display';
import FieldHelper from './field.helper';
import { SlotFieldValue } from '../models/slot-field-value';
import { SlotMapping } from '../models/slot-mapping.js';

interface DisplaySlot {
  name: string;
  key: string;
  type: string;
  inverse?: string;
  auto?: string[];
}

export default class DisplayHelper {
  static isDisabled(mappings: SlotMapping[]) {
    const enabledMapping = mappings.find((x) => x.slotKey === 'enabled');
    const disabledMapping = mappings.find((x) => x.slotKey === 'disabled');

    if (enabledMapping) return !enabledMapping.value;
    if (disabledMapping) return disabledMapping.value;

    return false;
  }

  static displayName(type: EntityDisplayType): string {
    switch (type) {
      case 'dots': return 'Dots';
      case 'square': return 'Square';
      case 'card': return 'Card';
      case 'toggle': return 'Toggle';
      default: throw new Error('Invalid display type');
    }
  }

  static slotName(type: EntityDisplayType): string {
    switch (type) {
      case 'dots': return 'Dots';
      case 'square': return 'Square';
      case 'card': return 'Card';
      case 'toggle': return 'Toggle';
      default: throw new Error('Invalid display type');
    }
  }

  static slots(type: EntityDisplayType): DisplaySlot[] {
    switch (type) {
      case 'dots': return dotsSlots;
      case 'square': return squareSlots;
      case 'card': return cardSlots;
      case 'toggle': return toggleSlots;
      default: throw new Error('Invalid display type');
    }
  }

  static defaultSize(type: EntityDisplayType) {
    switch (type) {
      case 'dots': return { width: 40, height: 10 };
      case 'square': return { width: 20, height: 20 };
      case 'card': return { width: 45, height: 8 };
      case 'toggle': return { width: 30, height: 5 };
      default: throw new Error('Invalid display type');
    }
  }

  static autoMapping(
    type: EntityDisplayType, fields: EntityField[], actions: EntityAction[],
  ): SlotFieldMapping[] {
    const slots = DisplayHelper.slots(type);
    const sortedSlots = slots.sort((a, b) => a.key.localeCompare(b.key));
    return sortedSlots
      .map((slot) => {
        const autoKey = slot.auto && slot.auto.find((key) => (slot.type === 'action'
          ? actions.find((x) => x.key === key)
          : fields.find((x) => x.key === key)));
        if (!autoKey) return undefined;
        return { slotKey: slot.key, fieldKey: autoKey };
      })
      .filter((x): x is SlotFieldMapping => Boolean(x));
  }

  static getFieldMappings(
    entity: CreateEntity,
    optionalFieldMappings: FieldValueMapping[] = [],
  ): FieldValueMapping[] {
    const initialFieldMappings = FieldHelper.getFields(entity)
      .map((field) => {
        const optional = optionalFieldMappings.find((x) => x.fieldKey === field.key);
        return {
          fieldKey: field.key,
          value: optional?.value !== undefined ? optional.value : field.initial,
        };
      });

    return [
      ...initialFieldMappings,
      ...optionalFieldMappings,
    ];
  }

  static map(
    display: EntityDisplay,
    entity: CreateEntity,
    optionalSlotMappings?: SlotFieldMapping[],
    optionalFieldMappings: FieldValueMapping[] = [],
  ): SlotFieldValue[] {
    const slots = DisplayHelper.slots(display.type);

    const slotMappings = optionalSlotMappings || display?.mappings || [];
    const fieldMappings = DisplayHelper.getFieldMappings(entity, optionalFieldMappings);

    const slotValueMappings: SlotFieldValue[] = slotMappings.map((sfMapping) => {
      const slot = slots.find((x) => x.key === sfMapping.slotKey);

      if (slot?.type === 'action') {
        const action = entity.actions.find((x) => x.key === sfMapping.fieldKey);
        return { ...sfMapping, value: action?.key };
      }

      const fvMapping = fieldMappings.find((x) => x.fieldKey === sfMapping.fieldKey);

      const entityField = entity.fields.find((x) => x.key === fvMapping?.fieldKey);
      const fullValue = (entityField?.prefix ? entityField?.prefix : '')
        + fvMapping?.value
        + (entityField?.postfix ? entityField?.postfix : '');
      return { ...sfMapping, value: fullValue };
    });

    return slotValueMappings;
  }

  static list(): EntityDisplayType[] {
    return ['dots', 'card', 'square', 'toggle'];
  }
}
