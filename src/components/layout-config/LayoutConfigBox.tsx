import React, { useState } from 'react';
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd';
import ContainerSize from '../../models/layout/container-size';
import LayoutEntry from '../../models/layout/layout-entry';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import LayoutConfigDialog from './LayoutConfigDialog';
import './LayoutConfigBox.css';
import { LayoutPositionHelper } from '../../models/layout/layout-position';

interface LayoutBoxProps {
  containerSize: ContainerSize,
  entry: LayoutEntry,
  onPositionChange: (data: DraggableData) => void,
  onSizeChange: (dir: string, delta: ResizableDelta) => void,
}

const LayoutConfigBox = ({
  containerSize, entry, onPositionChange, onSizeChange,
}: LayoutBoxProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const gameObjects = useAppSelector(selectGameObjects);

  const obj = gameObjects.find((x) => x.id === entry.objectId);

  return (
    <Rnd
      className="layout-box"
      position={LayoutPositionHelper.getPosition(entry.position, containerSize)}
      size={LayoutPositionHelper.getSize(entry.position, containerSize)}
      onDragStop={(_e, data) => onPositionChange(data)}
      onResizeStop={(_e, dir, _el, delta) => onSizeChange(dir, delta)}
      bounds="parent"
    >
      <div
        className="inner"
        onDoubleClick={(e) => { e.stopPropagation(); setDialogOpen(true); }}
      >
        <div>
          <b>{obj ? obj.name : 'Empty'}</b>
        </div>

        <div>
          {entry.display}
        </div>

        <LayoutConfigDialog
          open={dialogOpen}
          entry={entry}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </Rnd>
  );
};

export default LayoutConfigBox;
