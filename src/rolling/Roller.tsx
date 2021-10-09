import React, { CSSProperties } from 'react';
import { performRoll, selectRoll } from '../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../store/store';

const classes: { [key: string]: CSSProperties } = {
  roller: {
    width: '400px',
  },
};

const Roller = () => {
  const dispatch = useAppDispatch();
  const roll = useAppSelector(selectRoll);

  return (
    <div style={classes.roller}>
      {roll?.baseValue !== 0 && roll?.baseValue}

      {roll?.faceDict.map((x, index) => (
        <span>
          {(index !== 0 || roll?.baseValue !== 0) && ' + '}
          {x.count}
          d
          {x.faces}
        </span>
      ))}

      <button type="button" onClick={() => dispatch(performRoll())}>Roll</button>
    </div>
  );
};

export default Roller;
