import DisplayType from './display-type';
import LayoutPosition from './layout-position';

export default interface LayoutEntry {
  position: LayoutPosition,
  key: string;
  display: DisplayType;
}
