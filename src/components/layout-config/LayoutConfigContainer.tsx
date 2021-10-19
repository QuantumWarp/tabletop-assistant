import React from 'react';
import LayoutTab from '../../models/layout/layout-tab';
import { addEntry, updateEntry, updateEntryPosition } from '../../store/configuration-slice';
import { useAppDispatch } from '../../store/store';
import ConfigureBox from './LayoutConfigBox';
import './LayoutConfigContainer.css';

const containerSize = { width: 1000, height: 1000 };

interface LayoutConfigContainerProps {
  layout: LayoutTab,
}

const LayoutConfigContainer = ({ layout }: LayoutConfigContainerProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="layout-config-container"
      onDoubleClick={() => dispatch(addEntry())}
    >
      {layout.entries.map((entry) => (
        <ConfigureBox
          containerSize={containerSize}
          key={entry.id}
          entry={entry}
          onDetailChange={(updatedEntry) => dispatch(updateEntry(updatedEntry))}
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
  );
};

export default LayoutConfigContainer;
