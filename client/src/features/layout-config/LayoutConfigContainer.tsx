import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Layout, LayoutPosition } from '@/common';
import LayoutConfigBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';
import EditLayoutEntryDialog from './EditLayoutEntryDialog';
import { useUpdateLayoutMutation } from '../../store/api';

interface LayoutConfigContainerProps {
  layout: Layout,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
  const [newEntryPosition, setNewEntryPosition] = useState<LayoutPosition>();

  const [updateLayout] = useUpdateLayoutMutation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const [entries, setEntries] = useState(layout.entries);

  useEffect(() => setEntries(layout.entries), [layout]);

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
        <div
          className="click-area"
          onClick={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const newPos = {
              left: ((e.clientX - rect.left) / containerWidth) * 100,
              top: ((e.clientY - rect.top) / containerWidth) * 100,
            };
            setNewEntryPosition(newPos);
          }}
        />

        {entries.map((entry, index) => (
          <LayoutConfigBox
            containerWidth={containerWidth}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            entry={entry}
            // TODO: Don't save so often
            onChange={(updated) => {
              const newEntries = entries.filter((x) => x !== entry).concat([updated]);
              setEntries(newEntries);
              updateLayout({ ...layout, entries: newEntries });
            }}
            onDelete={() => {
              const newEntries = entries.filter((x) => x !== entry);
              setEntries(newEntries);
              updateLayout({ ...layout, entries: newEntries });
            }}
          />
        ))}
      </Box>

      {newEntryPosition && (
        <EditLayoutEntryDialog
          open={Boolean(newEntryPosition)}
          position={newEntryPosition}
          onSave={(entry) => setEntries(entries.concat([entry]))}
          onDelete={() => {}}
          onClose={() => setNewEntryPosition(undefined)}
        />
      )}
    </>
  );
};

export default LayoutConfigContainer;
