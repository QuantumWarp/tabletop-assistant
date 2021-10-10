import React, { CSSProperties } from 'react';
import GameObject from '../../models/objects/game-object';

const classes: { [key: string]: CSSProperties } = {
  gameObject: {
    border: '1px solid black',
    padding: '10px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
};

interface MultiNumberDisplayProps {
  gameObject: GameObject,
}

const MultiNumberDisplay = ({ gameObject }: MultiNumberDisplayProps) => (
  <div style={classes.gameObject}>
    <div style={classes.small}>
      {gameObject.value.small}
    </div>

    <div style={classes.large}>
      {gameObject.value.large}
    </div>

    <div style={classes.name}>
      {gameObject.name}
    </div>
  </div>
);

export default MultiNumberDisplay;
