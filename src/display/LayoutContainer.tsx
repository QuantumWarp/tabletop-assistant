import React, { CSSProperties, useState } from 'react';
import { DraggableData, ResizableDelta } from 'react-rnd';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import LayoutPosition from '../models/layout/layout-position';
import LayoutTab from '../models/layout/layout-tab';
import LayoutBox from './LayoutBox';

const classes: { [key: string]: CSSProperties } = {
  layoutContainer: {
    position: 'relative',
    height: '1000px',
    width: '1000px',
    border: '1px solid black',
  },
};

const containerSize = { width: 1000, height: 1000 };

interface LayoutContainerProps {
  tab: LayoutTab,
}

const LayoutContainer = ({ tab }: LayoutContainerProps) => {
  const [entries, setEntries] = useState(tab.entries);

  const addEntry = () => {
    setEntries(entries.concat({
      display: DisplayType.default,
      position: new LayoutPosition(0, 0, 10, 10),
      key: '',
    }));
  };

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
      onDoubleClick={addEntry}
    >
      {entries.map((entry) => (
        <LayoutBox
          containerSize={containerSize}
          key={entry.key}
          entry={entry}
          onPositionChange={(data) => updatePosition(entry, data)}
          onSizeChange={(dir, delta) => updateSize(entry, dir, delta)}
        />
      ))}
    </div>
  );
};

export default LayoutContainer;
