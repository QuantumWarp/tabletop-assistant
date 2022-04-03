export default interface ToggleDisplay {
  disabled: boolean;
  name: string;
  toggle: boolean;
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
  name: 'Toggle',
  key: 'toggle',
  type: 'boolean',
}, {
  name: 'Action',
  key: 'action',
  type: 'action',
}];
