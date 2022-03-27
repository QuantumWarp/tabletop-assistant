import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'tabletop-assistant-common';
import LayoutConfigBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';
import EditLayoutEntryDialog from './EditLayoutEntryDialog';

interface LayoutConfigContainerProps {
  layout: Layout,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
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

        {layout.entries.map((entry, index) => (
          <LayoutConfigBox
            containerWidth={containerWidth}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            entry={entry}
            onPositionChange={() => ({})}
            onSizeChange={() => ({})}
          />
        ))}
      </Box>

      {newEntryDialogOpen && (
        <EditLayoutEntryDialog
          open={newEntryDialogOpen}
          onClose={() => setNewEntryDialogOpen(false)}
          onSave={() => ({})}
        />
      )}
    </>
  );
};

export default LayoutConfigContainer;
