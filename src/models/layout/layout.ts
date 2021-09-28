import LayoutTab from './layout-tab';

export default interface Layout {
  name: string;
  columns: number;
  rows: number;
  tabs: LayoutTab[];
}
