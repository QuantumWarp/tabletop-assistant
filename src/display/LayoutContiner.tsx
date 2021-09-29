import React, { CSSProperties } from 'react';
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

const LayoutContainer = ({ tab }: LayoutContainerProps) => (
  <div style={classes.layoutContainer}>
    {tab.entries.map((entry) => (
      <LayoutBox
        key={entry.key}
        entry={entry}
      />
    ))}
  </div>
);

export default LayoutContainer;
