import DisplayType from './display-type';
import LayoutPosition from './layout-position';

export default interface LayoutEntry {
  id: string;
  objectId: string;
  display: DisplayType;
  position: LayoutPosition;
}
