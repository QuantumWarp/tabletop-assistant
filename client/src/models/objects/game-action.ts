import ActionTrigger from './action-trigger';

export default interface GameAction {
  id: string;
  objectId: string;
  triggers: ActionTrigger[];
  icon?: string;
  name?: string;
  roll?: string;
}
