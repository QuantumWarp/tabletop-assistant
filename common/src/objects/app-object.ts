import DisplayType from '../layout/display-type';
import AppAction from './app-action';
import AppObjectField from './app-object-field';

export default interface AppObject {
  id: string;

  name: string;
  disabled: boolean;

  group?: string;
  icon?: string;
  description?: string;
  defaultDisplayType?: DisplayType;

  fields: AppObjectField[];
  actions: AppAction[];
}
