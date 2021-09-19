import React, { CSSProperties } from 'react';
import Roll from '../models/dice/roll';

const classes: { [key: string]: CSSProperties } = {
  roll: {

  },
};

interface CurrentRollProps {
  roll: Roll,
}

const CurrentRoll = ({ roll }: CurrentRollProps) => (
  <div style={classes.roll}>
    {roll.baseValue}
  </div>
);

export default CurrentRoll;
