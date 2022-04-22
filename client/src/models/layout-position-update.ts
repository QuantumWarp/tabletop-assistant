export default interface LayoutPositionUpdate {
  containerWidth: number;
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
