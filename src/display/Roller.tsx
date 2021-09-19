import React, { CSSProperties } from 'react';
import Roll from '../models/dice/roll';

const classes: { [key: string]: CSSProperties } = {
  roller: {

  },
};

interface RollerProps {
  roll: Roll,
}

const Roller = ({ roll }: RollerProps) => (
  <div style={classes.roller}>
    {roll.baseValue}

    {roll.faceDict.map((x) => (
      <span>
        {x.count}
        d
        {x.count}
      </span>
    ))}

  </div>
);

export default Roller;
