import { TabletopIconType } from '../../components/common/TabletopIcon';
import ActionTrigger from './action-trigger';

export default interface GameAction {
  id: string;
  objectId: string;
  triggers: ActionTrigger[];
  icon?: TabletopIconType;
  name?: string;
  roll?: string;
  macro?: string;
}
