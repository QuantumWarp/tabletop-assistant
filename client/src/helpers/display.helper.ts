import DisplayType from './display.type';
import { slots as dotsSlots } from './displays/dots.display';
import { slots as squareSlots } from './displays/square.display';
import { slots as cardSlots } from './displays/card.display';
import { slots as toggleSlots } from './displays/toggle.display';
import { CreateEntity } from 'tabletop-assistant-common';

export default class DisplayHelper {
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

  static slots(type: DisplayType) {
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
      case DisplayType.Card: return { width: 45, height: 8.5 };
      case DisplayType.Toggle: return { width: 30, height: 5 };
      default: throw new Error('Invalid display type');
    }
  }

  static map<T>(
    type: DisplayType,
    entity: CreateEntity,
    mappings?: { [field: string]: string },
  ): T {
    const slots = DisplayHelper.slots(type);

    const slotValueMapping = Object.keys(slotFieldMappings)
      .reduce((obj, slotKey) => {
        const slot = slots.find((x) => x.key === slotKey);

        if (slot?.type === 'action') {
          return { ...obj, [slotKey]: slotFieldMappings[slotKey] };
        }

        const field = slotFieldMappings[slotKey];
        const value = fieldValueMappings[field];
        return { ...obj, [slotKey]: value };
      }, {});

    return slotValueMapping as T;
  }

  static list(): DisplayType[] {
    return Object.values(DisplayType);
  }
}
