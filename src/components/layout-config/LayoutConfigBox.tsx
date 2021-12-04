import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DraggableData, ResizableDelta, Rnd } from 'react-rnd';
import LayoutEntry from '../../models/layout/layout-entry';
import { selectObjects } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';
import LayoutConfigDialog from './LayoutConfigDialog';
import './LayoutConfigBox.css';
import { LayoutPositionHelper } from '../../models/layout/layout-position';

interface LayoutBoxProps {
  containerWidth: number,
  entry: LayoutEntry,
  onPositionChange: (data: DraggableData) => void,
  onSizeChange: (dir: string, delta: ResizableDelta) => void,
}

const LayoutConfigBox = ({
  containerWidth, entry, onPositionChange, onSizeChange,
}: LayoutBoxProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const objects = useAppSelector(selectObjects);

  const obj = objects.find((x) => x.id === entry.objectId);

  return (
    <>
      <Rnd
        className="layout-box"
        position={LayoutPositionHelper.getPosition(entry.position, containerWidth)}
        size={LayoutPositionHelper.getSize(entry.position, containerWidth)}
        onDrag={() => setDragging(true)}
        onDragStop={(_e, data) => onPositionChange(data)}
        onResizeStop={(_e, dir, _el, delta) => onSizeChange(dir, delta)}
        bounds="parent"
      >
        <Box
          className="inner"
          border={2}
          sx={{ borderColor: 'custom.layout.border' }}
          onClick={() => { if (!dragging) setDialogOpen(true); setDragging(false); }}
        >
          <div>
            <b>{obj ? obj.name : 'Empty'}</b>
          </div>

          <div>
            {entry.display}
          </div>
        </Box>
      </Rnd>

      <LayoutConfigDialog
        open={dialogOpen}
        entry={entry}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default LayoutConfigBox;
