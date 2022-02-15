import AppActionTrigger from './app-action-trigger';

export default interface AppAction {
  id: string;
  name: string;
  icon?: string;
  roll?: string;
  triggers: AppActionTrigger[];
}
