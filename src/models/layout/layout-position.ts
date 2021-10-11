import { CSSProperties } from 'react';
import ContainerSize from './container-size';
import LayoutPositionUpdate from './layout-position-update';

export default interface LayoutPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export class LayoutPositionHelper {
  static createPosition(
    left: number,
    top: number,
    width: number,
    height: number,
  ): LayoutPosition {
    return {
      left,
      top,
      width,
      height,
    };
  }

  static getStyles(pos: LayoutPosition): CSSProperties {
    return {
      position: 'absolute',
      left: `${pos.left}%`,
      top: `${pos.top}%`,
      width: `${pos.width}%`,
      height: `${pos.height}%`,
    };
  }

  static getPosition(pos: LayoutPosition, con: ContainerSize) {
    return {
      x: (con.width / 100) * pos.left,
      y: (con.height / 100) * pos.top,
    };
  }

  static getSize(pos: LayoutPosition, con: ContainerSize) {
    return {
      width: (con.width / 100) * pos.width,
      height: (con.height / 100) * pos.height,
    };
  }

  // TODO: Better snapping rather than using a grid
  static updatePositionAndSize(pos: LayoutPosition, update: LayoutPositionUpdate): LayoutPosition {
    const newPos = { ...pos };

    if (update.position) {
      newPos.left = Math.round((update.position.x / update.containerSize.width) * 100);
      newPos.top = Math.round((update.position.y / update.containerSize.height) * 100);
    }

    if (update.resize) {
      newPos.width += Math.round((update.resize.deltaWidth / update.containerSize.width) * 100);
      newPos.height += Math.round((update.resize.deltaHeight / update.containerSize.height) * 100);

      if (update.resize.direction.toLowerCase().includes('left')) {
        newPos.left -= Math.round((update.resize.deltaWidth / update.containerSize.width) * 100);
      }

      if (update.resize.direction.toLowerCase().includes('top')) {
        newPos.top -= Math.round((update.resize.deltaHeight / update.containerSize.height) * 100);
      }
    }

    return newPos;
  }
}
