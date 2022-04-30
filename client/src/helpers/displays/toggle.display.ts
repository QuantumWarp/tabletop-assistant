import { DisplaySlot } from '../display.type';

export const slots: DisplaySlot[] = [{
  name: 'Name',
  key: 'name',
  type: 'string',
  auto: ['name', 'title', '_name'],
}, {
  name: 'Toggle',
  key: 'toggle',
  type: 'boolean',
  auto: ['toggle', 'switch', 'enabled', 'available', 'active', 'prepared'],
}, {
  name: 'Action',
  key: 'action',
  type: 'action',
  auto: ['action', 'use', 'cast', 'fire', 'activate'],
}];

export default interface ToggleDisplay {
  name: string;
  toggle: boolean;
  action: string;
}
