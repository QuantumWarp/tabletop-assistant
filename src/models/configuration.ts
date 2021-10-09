import GameObject from './game-object';
import LayoutTab from './layout/layout-tab';

export default interface Configuration {
  id: number;
  name: string;
  description: string;
  img: string;
  objects: GameObject[];
  tabs: LayoutTab[];
}
