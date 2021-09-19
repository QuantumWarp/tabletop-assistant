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

interface DefaultDisplayProps {
  gameObject: GameObject,
}

const DefaultDisplay = ({ gameObject }: DefaultDisplayProps) => {
  return (
    <div style={classes.gameObject}>
      <div style={classes.header}>
        <div style={classes.title}>{gameObject.name}</div>

        <div>
          {gameObject.macros.map((macro) => (
            <button>{macro.name}</button>
          ))}
        </div>
      </div>

      <div>{gameObject.description}</div>
    </div>
  );
}

export default DefaultDisplay;
