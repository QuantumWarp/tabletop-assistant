import { CSSProperties } from 'react';

export default class LayoutPosition {
  left: number;

  top: number;

  width: number;

  height: number;

  get sizing(): CSSProperties {
    return {
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
}
