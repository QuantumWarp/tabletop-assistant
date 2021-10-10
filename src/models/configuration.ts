import RollResult from './dice/roll-result';
import GameObject from './objects/game-object';
import LayoutTab from './layout/layout-tab';

export default interface Configuration {
  id: string;
  name: string;
  description: string;
  img: string;
  objects: GameObject[];
  tabs: LayoutTab[];
  history: RollResult[];
}
