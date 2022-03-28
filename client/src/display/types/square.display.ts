export default interface CardDisplay {
  disabled: boolean;
  name: string;
  current: number;
  maximum: number;
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
  name: 'Current',
  key: 'current',
  type: 'number',
}, {
  name: 'Maximum',
  key: 'maximum',
  type: 'number',
}];
