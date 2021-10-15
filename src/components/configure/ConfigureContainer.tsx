import React, { CSSProperties } from 'react';
import LayoutTab from '../../models/layout/layout-tab';
import { addEntry, updateEntry, updateEntryPosition } from '../../store/configuration-slice';
import { useAppDispatch } from '../../store/store';
import ConfigureBox from './ConfigureBox';

const classes: { [key: string]: CSSProperties } = {
  layoutContainer: {
    position: 'relative',
    height: '1000px',
    width: '1000px',
    border: '1px solid black',
  },
};

const containerSize = { width: 1000, height: 1000 };

interface ConfigureContainerProps {
  layout: LayoutTab,
}

const ConfigureContainer = ({ layout }: ConfigureContainerProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      style={classes.layoutContainer}
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

export default ConfigureContainer;
