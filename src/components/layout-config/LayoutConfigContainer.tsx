import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import LayoutTab from '../../models/layout/layout-tab';
import { updateEntryPosition } from '../../store/config-slice';
import { useAppDispatch } from '../../store/store';
import LayoutConfigBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';
import LayoutConfigDialog from './LayoutConfigDialog';

interface LayoutConfigContainerProps {
  layout: LayoutTab,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
  const dispatch = useAppDispatch();

  const [newEntryDialogOpen, setNewEntryDialogOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Box
        className="layout-config-container"
        sx={{ backgroundColor: 'custom.layout.background' }}
        ref={containerRef}
      >
        <div className="click-area" onClick={() => setNewEntryDialogOpen(true)} />

        {layout.entries.map((entry) => (
          <LayoutConfigBox
            containerWidth={containerWidth}
            key={entry.id}
            entry={entry}
            onPositionChange={(data) => dispatch(updateEntryPosition({
              entryId: entry.id,
              containerWidth,
              position: {
                x: data.x,
                y: data.y,
              },
            }))}
            onSizeChange={(direction, delta) => dispatch(updateEntryPosition({
              entryId: entry.id,
              containerWidth,
              resize: {
                direction,
                deltaHeight: delta.height,
                deltaWidth: delta.width,
              },
            }))}
          />
        ))}
      </Box>

      {newEntryDialogOpen && (
        <LayoutConfigDialog
          open={newEntryDialogOpen}
          onClose={() => setNewEntryDialogOpen(false)}
        />
      )}
    </>
  );
};

export default LayoutConfigContainer;
