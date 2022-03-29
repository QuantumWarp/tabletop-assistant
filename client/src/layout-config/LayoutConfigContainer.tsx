import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'tabletop-assistant-common';
import LayoutConfigBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';
import EditLayoutEntryDialog from './EditLayoutEntryDialog';
import { useUpdateLayoutMutation } from '../store/api';

interface LayoutConfigContainerProps {
  layout: Layout,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
  const [newEntryDialogOpen, setNewEntryDialogOpen] = useState(false);

  const [updateLayout] = useUpdateLayoutMutation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const [entries, setEntries] = useState(layout.entries);

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

        {entries.map((entry, index) => (
          <LayoutConfigBox
            containerWidth={containerWidth}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            entry={entry}
            // TODO: Don't save so often
            onChange={(updated) => {
              setEntries(entries.filter((x) => x !== entry).concat([updated]));
              updateLayout({ ...layout, entries });
            }}
          />
        ))}
      </Box>

      {newEntryDialogOpen && (
        <EditLayoutEntryDialog
          open={newEntryDialogOpen}
          onClose={() => setNewEntryDialogOpen(false)}
          onSave={(entry) => setEntries(entries.concat([entry]))}
        />
      )}
    </>
  );
};

export default LayoutConfigContainer;