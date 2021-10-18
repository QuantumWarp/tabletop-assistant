import GameObject from './objects/game-object';
import LayoutTab from './layout/layout-tab';
import GameAction from './objects/game-action';
import Note from './notes/note';
import HistoryEntry from './history/history-entry';

export default interface Configuration {
  id: string;
  shortName: string;
  name: string;
  description: string;
  img: string;
  layouts: LayoutTab[];
  objects: GameObject[];
  actions: GameAction[];
  notes: Note[];
  history: HistoryEntry[];
}
