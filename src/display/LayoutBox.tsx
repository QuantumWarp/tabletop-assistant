import React, { CSSProperties } from 'react';
import LayoutEntry from '../models/layout/layout-entry';

const classes: { [key: string]: CSSProperties } = {
  layoutBox: {
    position: 'absolute',
    border: '1px solid black',
  },
};

interface LayoutBoxProps {
  entry: LayoutEntry,
}

const LayoutBox = ({ entry }: LayoutBoxProps) => (
  <div style={{ ...classes.layoutBox, ...entry.position.sizing }}>
    {entry.key}
  </div>
);

export default LayoutBox;
