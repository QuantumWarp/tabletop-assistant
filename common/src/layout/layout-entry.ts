import DisplayType from './display-type';
import LayoutSize from './layout-size';
import LayoutPosition from './layout-position';

export default interface LayoutEntry {
  objectId: string;
  display: DisplayType;
  position: LayoutPosition;
  size: LayoutSize;
}
