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

  static getPositionStyle(pos: LayoutPosition, containerWidth: number) {
    return {
      left: `${(containerWidth / 100) * pos.left}px`,
      top: `${(containerWidth / 100) * pos.top}px`,
    };
  }

  static getSizeStyle(pos: LayoutPosition, containerWidth: number) {
    return {
      width: `${(containerWidth / 100) * pos.width}px`,
      height: `${(containerWidth / 100) * pos.height}px`,
    };
  }

  static getPosition(pos: LayoutPosition, containerWidth: number) {
    return {
      x: (containerWidth / 100) * pos.left,
      y: (containerWidth / 100) * pos.top,
    };
  }

  static getSize(pos: LayoutPosition, containerWidth: number) {
    return {
      width: (containerWidth / 100) * pos.width,
      height: (containerWidth / 100) * pos.height,
    };
  }

  // TODO: Better snapping rather than using a grid
  static updatePositionAndSize(pos: LayoutPosition, update: LayoutPositionUpdate): LayoutPosition {
    const newPos = { ...pos };

    if (update.position) {
      newPos.left = Math.round((update.position.x / update.containerWidth) * 100);
      newPos.top = Math.round((update.position.y / update.containerWidth) * 100);
    }

    if (update.resize) {
      newPos.width += Math.round((update.resize.deltaWidth / update.containerWidth) * 100);
      newPos.height += Math.round((update.resize.deltaHeight / update.containerWidth) * 100);

      if (update.resize.direction.toLowerCase().includes('left')) {
        newPos.left -= Math.round((update.resize.deltaWidth / update.containerWidth) * 100);
      }

      if (update.resize.direction.toLowerCase().includes('top')) {
        newPos.top -= Math.round((update.resize.deltaHeight / update.containerWidth) * 100);
      }
    }

    return newPos;
  }
}
