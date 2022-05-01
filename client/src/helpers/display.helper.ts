import {
  CreateEntity, EntityAction, EntityDisplay, EntityField,
} from 'tabletop-assistant-common';
import DisplayType from './display.type';
import { slots as dotsSlots } from './displays/dots.display';
import { slots as squareSlots } from './displays/square.display';
import { slots as cardSlots } from './displays/card.display';
import { slots as toggleSlots } from './displays/toggle.display';
import FieldHelper from './field.helper';

interface DisplaySlot {
  name: string;
  key: string;
  type: string;
  inverse?: string;
  auto?: string[];
}

export default class DisplayHelper {
  static isDisabled(slotValues: { [field: string]: any }) {
    if (slotValues.enabled !== undefined) {
      return !slotValues.enabled;
    }
    if (slotValues.disabled !== undefined) {
      return slotValues.disabled;
    }
    return false;
  }

  static displayName(type: DisplayType): string {
    switch (type) {
      case DisplayType.Dots: return 'Dots';
      case DisplayType.Square: return 'Square';
      case DisplayType.Card: return 'Card';
      case DisplayType.Toggle: return 'Toggle';
      default: throw new Error('Invalid display type');
    }
  }

  static slotName(type: DisplayType): string {
    switch (type) {
      case DisplayType.Dots: return 'Dots';
      case DisplayType.Square: return 'Square';
      case DisplayType.Card: return 'Card';
      case DisplayType.Toggle: return 'Toggle';
      default: throw new Error('Invalid display type');
    }
  }

  static slots(type: DisplayType): DisplaySlot[] {
    switch (type) {
      case DisplayType.Dots: return dotsSlots;
      case DisplayType.Square: return squareSlots;
      case DisplayType.Card: return cardSlots;
      case DisplayType.Toggle: return toggleSlots;
      default: throw new Error('Invalid display type');
    }
  }

  static defaultSize(type: DisplayType) {
    switch (type) {
      case DisplayType.Dots: return { width: 40, height: 10 };
      case DisplayType.Square: return { width: 20, height: 20 };
      case DisplayType.Card: return { width: 45, height: 8 };
      case DisplayType.Toggle: return { width: 30, height: 5 };
      default: throw new Error('Invalid display type');
    }
  }

  static autoMapping(
    type: DisplayType, fields: EntityField[], actions: EntityAction[],
  ): { [slot: string]: string } {
    const slots = DisplayHelper.slots(type);
    const sortedSlots = slots.sort((a, b) => a.key.localeCompare(b.key));
    return sortedSlots.reduce((obj, a) => {
      const autoKey = a.auto && a.auto.find((key) => (a.type === 'action'
        ? actions.find((x) => x.key === key)
        : fields.find((x) => x.key === key)));
      if (!autoKey) return obj;
      if (a.inverse && Object.keys(obj).includes(a.inverse)) return obj;
      return { ...obj, [a.key]: autoKey };
    }, {});
  }

  static getFieldMappings(
    entity: CreateEntity,
    optionalFieldMappings: { [field: string]: string } = {},
  ) {
    const initialFieldMappings = FieldHelper.getFields(entity)
      .reduce((obj, a) => ({
        ...obj,
        [a.key]: a.initial,
      }), {} as { [field: string]: string });

    return {
      ...initialFieldMappings,
      ...optionalFieldMappings,
    };
  }

  static map<T>(
    display: EntityDisplay,
    entity: CreateEntity,
    optionalSlotMappings?: { [slot: string]: string },
    optionalFieldMappings: { [field: string]: string } = {},
  ): T {
    const slots = DisplayHelper.slots(display.type as DisplayType);

    const slotMappings = optionalSlotMappings || display?.mappings || {};
    const fieldMappings = DisplayHelper.getFieldMappings(entity, optionalFieldMappings);

    const slotValueMapping = Object.keys(slotMappings)
      .reduce((obj, slotKey) => {
        const slot = slots.find((x) => x.key === slotKey);

        if (slot?.type === 'action') {
          const action = entity.actions.find((x) => x.key === slotMappings[slotKey]);
          return { ...obj, [slotKey]: action?.name };
        }

        const field = slotMappings[slotKey];
        const value = fieldMappings[field];
        return { ...obj, [slotKey]: value };
      }, {});

    return slotValueMapping as T;
  }

  static list(): DisplayType[] {
    return Object.values(DisplayType);
  }
}
