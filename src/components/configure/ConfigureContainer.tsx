import React, { CSSProperties, useState } from 'react';
import { DraggableData, ResizableDelta } from 'react-rnd';
import LayoutEntry from '../../models/layout/layout-entry';
import { updatePosition, updateSize } from '../../models/layout/layout-position';
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

  const updatePos = (entry: LayoutEntry, data: DraggableData) => {
    // eslint-disable-next-line no-param-reassign
    entry.position = updatePosition(entry.position, containerSize, data);
    setEntries([...entries]);
  };

  const updateS = (entry: LayoutEntry, dir: string, delta: ResizableDelta) => {
    // eslint-disable-next-line no-param-reassign
    entry.position = updateSize(entry.position, containerSize, dir, delta);
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
          onPositionChange={(data) => updatePos(entry, data)}
          onSizeChange={(dir, delta) => updateS(entry, dir, delta)}
        />
      ))}
    </div>
  );
};

export default ConfigureContainer;
