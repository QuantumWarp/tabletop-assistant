import React from 'react';
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd';
import ContainerSize from '../models/layout/container-size';
import LayoutEntry from '../models/layout/layout-entry';
import { selectGameObjects } from '../store/main-slice';
import { useAppSelector } from '../store/store';
import './LayoutBox.css';

interface LayoutBoxProps {
  containerSize: ContainerSize,
  entry: LayoutEntry,
  onPositionChange: (data: DraggableData) => void,
  onSizeChange: (dir: string, delta: ResizableDelta) => void,
}

const LayoutBox = ({
  containerSize, entry, onPositionChange, onSizeChange,
}: LayoutBoxProps) => {
  const gameObjects = useAppSelector(selectGameObjects);

  const obj = gameObjects.find((x) => x.key === entry.key);

  return (
    <Rnd
      className="layout-box"
      position={entry.position.position(containerSize)}
      size={entry.position.size(containerSize)}
      onDragStop={(_e, data) => onPositionChange(data)}
      onResizeStop={(_e, dir, _el, delta) => onSizeChange(dir, delta)}
      bounds="parent"
    >
      <div className="inner">
        <div>{obj ? obj.name : 'Empty'}</div>
        <div>
          Type -
          {' '}
          {entry.display}
        </div>
      </div>
    </Rnd>
  );
};

export default LayoutBox;
