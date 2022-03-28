import { slots as dotsSlots } from './dots.display';
import { slots as squareSlots } from './square.display';
import { slots as cardSlots } from './card.display';
import { slots as toggleSlots } from './toggle.display';

enum DisplayType {
  Dots = 'dots',
  Square = 'square',
  Card = 'card',
  Toggle = 'toggle',
}

export default DisplayType;

export class DisplayTypeHelper {
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

  static list(): DisplayType[] {
    return Object.values(DisplayType);
  }
}
