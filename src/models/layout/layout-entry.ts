import DisplayType from './display-type';
import LayoutPosition from './layout-position';

export default interface LayoutEntry {
  id: string;
  position: LayoutPosition;
  key: string;
  display: DisplayType;
}
