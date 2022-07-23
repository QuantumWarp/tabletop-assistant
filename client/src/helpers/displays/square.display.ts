import DisplaySlot from '../../models/display-slot';

export const slots: DisplaySlot[] = [{
  name: 'Disabled',
  key: 'disabled',
  type: 'boolean',
  inverse: 'enabled',
  auto: ['disabled', 'unavailable', 'inactive'],
}, {
  name: 'Enabled',
  key: 'enabled',
  type: 'boolean',
  inverse: 'disabled',
  auto: ['enabled', 'available', 'active', 'prepared'],
}, {
  name: 'Icon',
  key: 'icon',
  type: 'string',
  auto: ['_icon'],
}, {
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
  name: 'Secondary Value',
  key: 'secondaryValue',
  type: 'number',
  auto: ['secondaryValue', 'maximum'],
}];

export default interface SquareDisplay {
  disabled?: boolean;
  enabled?: boolean;
  icon?: string;
  name?: string;
  value?: number;
  secondaryValue?: number;
}
