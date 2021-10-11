import ContainerSize from './container-size';

export default interface LayoutPositionUpdate {
  entryId: string;
  containerSize: ContainerSize;
  position?: {
    x: number;
    y: number;
  },
  resize?: {
    direction: string;
    deltaHeight: number;
    deltaWidth: number;
  }
}
