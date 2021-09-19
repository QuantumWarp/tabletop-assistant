import { CSSProperties } from 'react';
import GameObject from '../models/game-object';

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
  smallObj: GameObject,
  largeObj: GameObject,
}

const MultiNumberDisplay = ({ smallObj, largeObj }: MultiNumberDisplayProps) => {
  return (
    <div style={classes.gameObject}>
      <div style={classes.small}>
        {smallObj.value}
      </div>

      <div style={classes.large}>
        {largeObj.value}
      </div>

      <div style={classes.name}>
        {largeObj.name}
      </div>
    </div>
  );
}

export default MultiNumberDisplay;
