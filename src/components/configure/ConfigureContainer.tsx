import React, { CSSProperties, useState } from 'react';
import { DraggableData, ResizableDelta } from 'react-rnd';
import LayoutEntry from '../../models/layout/layout-entry';
import LayoutTab from '../../models/layout/layout-tab';
import { addEntry } from '../../store/configuration-slice';
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
  tab: LayoutTab,
}

const ConfigureContainer = ({ tab }: ConfigureContainerProps) => {
  const dispatch = useAppDispatch();
  const [entries, setEntries] = useState(tab.entries);

  const updatePosition = (entry: LayoutEntry, data: DraggableData) => {
    entry.position.updatePosition(containerSize, data);
    setEntries([...entries]);
  };

  const updateSize = (entry: LayoutEntry, dir: string, delta: ResizableDelta) => {
    entry.position.updateSize(containerSize, dir, delta);
    setEntries([...entries]);
  };

  return (
    <div
      style={classes.layoutContainer}
      onDoubleClick={() => dispatch(addEntry())}
    >
      {entries.map((entry) => (
        <ConfigureBox
          containerSize={containerSize}
          key={entry.key}
          entry={entry}
          onDetailChange={(updatedEntry) => {
            const index = entries.indexOf(entry);
            entries[index] = updatedEntry;
            setEntries([...entries]);
          }}
          onPositionChange={(data) => updatePosition(entry, data)}
          onSizeChange={(dir, delta) => updateSize(entry, dir, delta)}
        />
      ))}
    </div>
  );
};

export default ConfigureContainer;
