export default interface CardDisplay {
  disabled: boolean;
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
}, {
  name: 'Name',
  key: 'name',
  type: 'string',
}, {
  name: 'Description',
  key: 'description',
  type: 'string',
}, {
  name: 'Current',
  key: 'current',
  type: 'number',
}, {
  name: 'Maximum',
  key: 'maximum',
  type: 'number',
}, {
  name: 'Action',
  key: 'action',
  type: 'string',
}];
