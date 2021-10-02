import React from 'react';
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd';
import ContainerSize from '../models/layout/container-size';
import LayoutEntry from '../models/layout/layout-entry';
import './LayoutBox.css';

interface LayoutBoxProps {
  containerSize: ContainerSize,
  entry: LayoutEntry,
  onChange: (entry: LayoutEntry) => void;
}

const LayoutBox = ({ containerSize, entry, onChange }: LayoutBoxProps) => {
  const updatePosition = (data: DraggableData) => {
    entry.position.updatePosition(containerSize, data);
    onChange(entry);
  };

  const updateSize = (dir: string, delta: ResizableDelta) => {
    entry.position.updateSize(containerSize, dir, delta);
    onChange(entry);
  };

  return (
    <Rnd
      className="layout-box"
      position={entry.position.position(containerSize)}
      size={entry.position.size(containerSize)}
      onDragStop={(_e, data) => updatePosition(data)}
      onResizeStop={(_e, dir, _el, delta) => updateSize(dir, delta)}
      bounds="parent"
    >
      <div className="inner">
        {entry.key}
      </div>
    </Rnd>
  );
};

export default LayoutBox;
