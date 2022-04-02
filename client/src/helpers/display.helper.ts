import DisplayType from './display.type';
import { slots as dotsSlots } from './displays/dots.display';
import { slots as squareSlots } from './displays/square.display';
import { slots as cardSlots } from './displays/card.display';
import { slots as toggleSlots } from './displays/toggle.display';

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
      case DisplayType.Dots: return { width: '400px', height: '100px' };
      case DisplayType.Square: return { width: '200px', height: '200px' };
      case DisplayType.Card: return { width: '450px', height: '85px' };
      case DisplayType.Toggle: return { width: '300px', height: '50px' };
      default: throw new Error('Invalid display type');
    }
  }

  static map<T>(
    slotFieldMappings: { [slot: string]: string },
    fieldValueMappings: { [field: string]: string },
  ): T {
    const slotValueMapping = Object.keys(slotFieldMappings)
      .reduce((obj, slot) => {
        const field = slotFieldMappings[slot];
        const value = fieldValueMappings[field];
        return { ...obj, [slot]: value };
      }, {});

    return slotValueMapping as T;
  }

  static list(): DisplayType[] {
    return Object.values(DisplayType);
  }
}
