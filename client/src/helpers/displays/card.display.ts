export default interface CardDisplay {
  disabled?: boolean;
  enabled?: boolean;
  icon: string;
  name: string;
  description: string;
  current: number;
  maximum: number;
  action: string;
}

export const slots = [{
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
  name: 'Description',
  key: 'description',
  type: 'string',
  auto: ['description', 'summary', 'text', '_description'],
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
}, {
  name: 'Action',
  key: 'action',
  type: 'action',
  auto: ['action', 'use', 'cast', 'fire', 'activate'],
}];
