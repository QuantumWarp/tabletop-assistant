export default interface LayoutPositionUpdate {
  entryId: string;
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
