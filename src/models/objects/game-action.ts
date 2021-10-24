import ActionTrigger from './action-trigger';

export default interface GameAction {
  id: string;
  objectId: string;
  triggers: ActionTrigger[];
  name?: string;
  roll?: string;
  macro?: string;
}
