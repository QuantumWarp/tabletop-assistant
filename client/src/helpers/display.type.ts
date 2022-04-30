enum DisplayType {
  Dots = 'dots',
  Square = 'square',
  Card = 'card',
  Toggle = 'toggle',
}

export default DisplayType;

export interface DisplaySlot {
  name: string;
  key: string;
  type: string;
  inverse?: string;
  auto?: string[];
  field?: string;
  value?: any;
}
