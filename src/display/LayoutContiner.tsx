import React, { CSSProperties, useState } from 'react';
import DisplayType from '../models/layout/display-type';
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

  return (
    <div
      style={classes.layoutContainer}
      onDoubleClick={addEntry}
    >
      {entries.map((entry) => (
        <LayoutBox
          containerSize={{ width: 1000, height: 1000 }}
          key={entry.key}
          entry={entry}
          onChange={() => setEntries([...entries])}
        />
      ))}
    </div>
  );
};

export default LayoutContainer;
