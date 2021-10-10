import { CSSProperties } from 'react';
import { DraggableData, ResizableDelta } from 'react-rnd';
import ContainerSize from './container-size';

export default interface LayoutPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const createPosition = (
  left: number, top: number, width: number, height: number,
): LayoutPosition => ({
  left, top, width, height,
});

export const getStyles = (pos: LayoutPosition): CSSProperties => ({
  position: 'absolute',
  left: `${pos.left}%`,
  top: `${pos.top}%`,
  width: `${pos.width}%`,
  height: `${pos.height}%`,
});

export const getPosition = (pos: LayoutPosition, con: ContainerSize) => ({
  x: (con.width / 100) * pos.left,
  y: (con.height / 100) * pos.top,
});

export const getSize = (pos: LayoutPosition, con: ContainerSize) => ({
  width: (con.width / 100) * pos.width,
  height: (con.height / 100) * pos.height,
});

// TODO: Better snapping rather than using a grid
export const updatePosition = (
  pos: LayoutPosition, con: ContainerSize, data: DraggableData,
): LayoutPosition => ({
  ...pos,
  left: Math.round((data.x / con.width) * 100),
  top: Math.round((data.y / con.height) * 100),
});

export const updateSize = (
  pos: LayoutPosition, con: ContainerSize, direction: string, delta: ResizableDelta,
) => {
  const newPos = { ...pos };
  newPos.width += Math.round((delta.width / con.width) * 100);
  newPos.height += Math.round((delta.height / con.height) * 100);

  if (direction.toLowerCase().includes('left')) {
    newPos.left -= Math.round((delta.width / con.width) * 100);
  }

  if (direction.toLowerCase().includes('top')) {
    newPos.top -= Math.round((delta.height / con.height) * 100);
  }

  return newPos;
};
