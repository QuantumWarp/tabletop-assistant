import GameObject from './objects/game-object';
import LayoutTab from './layout/layout-tab';
import GameAction from './objects/game-action';
import Note from './notes/note';
import HistoryEntry from './history/history-entry';
import ConfigInfo, { defaultConfigInfo } from './config-info';

export default interface Configuration {
  id: string;
  info: ConfigInfo,
  layouts: LayoutTab[];
  objects: GameObject[];
  actions: GameAction[];
  notes: Note[];
  history: HistoryEntry[];
}

export const defaultConfiguration: () => Configuration = () => ({
  id: '',
  info: defaultConfigInfo(),
  layouts: [],
  objects: [],
  actions: [],
  notes: [],
  history: [],
});
