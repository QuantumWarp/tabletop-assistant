import {
  CreateEntity, EntityAction, EntityDisplay, EntityDisplayType,
  EntityField, SlotFieldMapping,
} from 'tabletop-assistant-common';
import { slots as dotsSlots } from './displays/dots.display';
import { slots as squareSlots } from './displays/square.display';
import { slots as cardSlots } from './displays/card.display';
import { slots as toggleSlots } from './displays/toggle.display';
import { actionMapping, SlotMapping } from '../models/slot-mapping';
import { Mapping } from '../models/mapping';
import FieldHelper from './field.helper';

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

  static maps(mappings: Mapping[], display: EntityDisplay, entity: CreateEntity): SlotMapping[] {
    return display.mappings
      .map((displayMapping) => {
        const mapping = mappings.find((x) => x.fieldKey === displayMapping.fieldKey);
        const entityField = FieldHelper.getFields(entity)
          .find((x) => x.key === displayMapping.fieldKey);
        if (!mapping || !entityField) return null;

        const formattedValue = (entityField?.prefix || '') + mapping?.value + (entityField?.postfix || '');

        return {
          ...mapping,
          displayKey: display.key,
          slotKey: displayMapping?.slotKey,
          formattedValue,
        } as SlotMapping;
      })
      .filter((x): x is SlotMapping => x !== null);
  }

  static actionMaps(display: EntityDisplay, entity: CreateEntity): SlotMapping[] {
    const slots = DisplayHelper.slots(display.type);
    return slots
      .filter((slot) => slot.type === 'action')
      .map((slot) => {
        const displayMapping = display.mappings.find((x) => x.slotKey === slot.key);
        const entityField = entity.actions.find((x) => x.key === displayMapping?.fieldKey);
        if (!displayMapping) return null;
        return actionMapping(displayMapping, entityField?.name);
      })
      .filter((x): x is SlotMapping => x !== null);
  }

  static list(): EntityDisplayType[] {
    return ['dots', 'card', 'square', 'toggle'];
  }
}
