import DisplaySlot from '../../models/display-slot';

export const slots: DisplaySlot[] = [{
  name: 'Name',
  key: 'name',
  type: 'string',
  auto: ['name', 'title', '_name'],
}, {
  name: 'Value',
  key: 'value',
  type: 'number',
  auto: ['value', 'amount', 'current'],
}, {
  name: 'Maximum',
  key: 'maximum',
  type: 'number',
  auto: ['secondaryValue', 'maximum'],
}];

export default interface DotsDisplay {
  name: string;
  value: number;
  maximum: number;
}
