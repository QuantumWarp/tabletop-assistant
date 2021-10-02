import { DraggableData, ResizableDelta } from 'react-rnd';
import ContainerSize from './container-size';

export default class LayoutPosition {
  left: number;

  top: number;

  width: number;

  height: number;

  constructor(
    left: number,
    top: number,
    width: number,
    height: number,
  ) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  updatePosition(con: ContainerSize, data: DraggableData) {
    this.left = (data.x / con.width) * 100;
    this.top = (data.y / con.height) * 100;
  }

  updateSize(con: ContainerSize, direction: string, delta: ResizableDelta) {
    this.width += (delta.width / con.width) * 100;
    this.height += (delta.height / con.height) * 100;

    if (direction.toLowerCase().includes('left')) {
      this.left -= (delta.width / con.width) * 100;
    }

    if (direction.toLowerCase().includes('top')) {
      this.top -= (delta.height / con.height) * 100;
    }
  }

  position(con: ContainerSize) {
    return {
      x: (con.width / 100) * this.left,
      y: (con.height / 100) * this.top,
    };
  }

  size(con: ContainerSize) {
    return {
      width: (con.width / 100) * this.width,
      height: (con.height / 100) * this.height,
    };
  }
}
