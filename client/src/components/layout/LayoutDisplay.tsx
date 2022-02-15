import React from 'react';
import DisplayType, { defaultSize } from '../../models/layout/display-type';
import DisplaySimpleCard from './DisplaySimpleCard';
import DisplaySimpleToggle from './DisplaySimpleToggle';
import DisplayNumberSquare from './DisplayNumberSquare';
import DisplayDotCounter from './DisplayDotCounter';
import GameObject from '../../models/objects/game-object';

interface LayoutDisplayProps {
  display: DisplayType,
  obj: GameObject,
  interactable?: boolean,
}

const LayoutDisplay = ({ display, obj, interactable }: LayoutDisplayProps) => (
  <div
    style={{
      pointerEvents: interactable ? 'auto' : 'none',
      ...defaultSize(display),
    }}
  >
    {obj && display === DisplayType.simpleCard && (
      <DisplaySimpleCard
        obj={obj}
      />
    )}
    {obj && display === DisplayType.simpleToggle && (
      <DisplaySimpleToggle
        obj={obj}
      />
    )}
    {obj && display === DisplayType.numberSquare && (
      <DisplayNumberSquare
        obj={obj}
      />
    )}
    {obj && display === DisplayType.dotCounter && (
      <DisplayDotCounter
        obj={obj}
      />
    )}
  </div>
);

LayoutDisplay.defaultProps = {
  interactable: true,
};

export default LayoutDisplay;
