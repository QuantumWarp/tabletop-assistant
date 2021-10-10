import LayoutEntry from './layout-entry';

export default interface LayoutTab {
  id: string;
  name: string;
  entries: LayoutEntry[];
}
