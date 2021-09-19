import { CSSProperties } from 'react';
import Roll from '../models/dice/roll';

const classes: { [key: string]: CSSProperties } = {
  roll: {

  },
};

interface CurrentRollProps {
  roll: Roll,
}

const CurrentRoll = ({ roll }: CurrentRollProps) => {
  return (
    <div style={classes.roll}>
      {}
    </div>
  );
}

export default CurrentRoll;
