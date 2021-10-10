import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import GameObject from '../../models/objects/game-object';

const classes: { [key: string]: CSSProperties } = {
  gameObject: {
    border: '1px solid black',
    padding: '10px',
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

interface DisplaySimpleToggleProps {
  gameObject: GameObject,
}

const DisplaySimpleToggle = ({ gameObject }: DisplaySimpleToggleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useAppDispatch = useDispatch();

  return (
    <div style={classes.gameObject}>
      <div style={classes.header}>
        <div style={classes.title}>{gameObject.name}</div>

        <div>
          {/* {gameObject.macros.map((macro) => (
            <button
              key={macro.name}
              type="button"
              onClick={() => macro.action(useAppDispatch)}
            >
              {macro.name}
            </button>
          ))} */}
        </div>
      </div>

      <div>{gameObject.description}</div>
    </div>
  );
};

export default DisplaySimpleToggle;
