import RollResult from './dice/roll-result';
import GameObject from './objects/game-object';
import LayoutTab from './layout/layout-tab';
import GameAction from './objects/game-action';
import Note from './notes/note';

export default interface Configuration {
  id: string;
  name: string;
  description: string;
  img: string;
  layouts: LayoutTab[];
  objects: GameObject[];
  actions: GameAction[];
  notes: Note[];
  history: RollResult[];
}
