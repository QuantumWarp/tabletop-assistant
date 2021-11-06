import React, { useState } from 'react';
import LayoutTab from '../../models/layout/layout-tab';
import { updateEntryPosition } from '../../store/config-slice';
import { useAppDispatch } from '../../store/store';
import LayoutConfigBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';
import LayoutConfigDialog from './LayoutConfigDialog';

const containerSize = { width: 1000, height: 1000 };

interface LayoutConfigContainerProps {
  layout: LayoutTab,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
  const dispatch = useAppDispatch();
  const [newEntryDialogOpen, setNewEntryDialogOpen] = useState(false);

  return (
    <>
      <div
        className="layout-config-container"
      >
        <div className="click-area" onClick={() => setNewEntryDialogOpen(true)} />

        {layout.entries.map((entry) => (
          <LayoutConfigBox
            containerSize={containerSize}
            key={entry.id}
            entry={entry}
            onPositionChange={(data) => dispatch(updateEntryPosition({
              entryId: entry.id,
              containerSize,
              position: {
                x: data.x,
                y: data.y,
              },
            }))}
            onSizeChange={(direction, delta) => dispatch(updateEntryPosition({
              entryId: entry.id,
              containerSize,
              resize: {
                direction,
                deltaHeight: delta.height,
                deltaWidth: delta.width,
              },
            }))}
          />
        ))}
      </div>

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
