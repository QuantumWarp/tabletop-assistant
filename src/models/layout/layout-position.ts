import { CSSProperties } from 'react';
import { DraggableData, ResizableDelta } from 'react-rnd';
import ContainerSize from './container-size';

export default class LayoutPosition {
  left: number;

  top: number;

  width: number;

  height: number;

  get styles(): CSSProperties {
    return {
      position: 'absolute',
      left: `${this.left}%`,
      top: `${this.top}%`,
      width: `${this.width}%`,
      height: `${this.height}%`,
    };
  }

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

  // TODO: Better snapping rather than using a grid
  updatePosition(con: ContainerSize, data: DraggableData) {
    this.left = Math.round((data.x / con.width) * 100);
    this.top = Math.round((data.y / con.height) * 100);
  }

  updateSize(con: ContainerSize, direction: string, delta: ResizableDelta) {
    this.width += Math.round((delta.width / con.width) * 100);
    this.height += Math.round((delta.height / con.height) * 100);

    if (direction.toLowerCase().includes('left')) {
      this.left -= Math.round((delta.width / con.width) * 100);
    }

    if (direction.toLowerCase().includes('top')) {
      this.top -= Math.round((delta.height / con.height) * 100);
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
