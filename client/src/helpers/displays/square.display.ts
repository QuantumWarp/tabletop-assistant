import { DisplaySlot } from '../display.type';

export const slots: DisplaySlot[] = [{
  name: 'Icon',
  key: 'icon',
  type: 'string',
}, {
  name: 'Name',
  key: 'name',
  type: 'string',
}, {
  name: 'Disabled',
  key: 'disabled',
  type: 'boolean',
}, {
  name: 'Value',
  key: 'value',
  type: 'number',
}, {
  name: 'Secondary Value',
  key: 'secondaryValue',
  type: 'number',
}];

export default interface SquareDisplay {
  icon?: string;
  name?: string;
  disabled?: boolean;
  value?: number;
  secondaryValue?: number;
}
