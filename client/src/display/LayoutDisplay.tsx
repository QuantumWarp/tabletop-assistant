import React from 'react';
import DisplayHelper from '../helpers/display.helper';
import DisplayType from '../helpers/display.type';
import CardDisplay from '../helpers/displays/card.display';
import DotsDisplay from '../helpers/displays/dots.display';
import SquareDisplay from '../helpers/displays/square.display';
import ToggleDisplay from '../helpers/displays/toggle.display';
import DisplayCard from './DisplayCard';
import DisplayDots from './DisplayDots';
import DisplaySquare from './DisplaySquare';
import DisplayToggle from './DisplayToggle';

interface LayoutDisplayProps {
  type: DisplayType,
  preview?: boolean,
  slotFieldMappings: { [slot: string]: string },
  fieldValueMappings: { [field: string]: any },
}

const LayoutDisplay = ({
  type, preview = false, slotFieldMappings, fieldValueMappings,
}: LayoutDisplayProps) => {
  const slotValues = DisplayHelper.map(slotFieldMappings, fieldValueMappings);

  return (
    <>
      {type === DisplayType.Card && (
        <DisplayCard
          preview={preview}
          slots={slotValues as CardDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Dots && (
        <DisplayDots
          preview={preview}
          slots={slotValues as DotsDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Square && (
        <DisplaySquare
          preview={preview}
          slots={slotValues as SquareDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Toggle && (
        <DisplayToggle
          preview={preview}
          slots={slotValues as ToggleDisplay}
          onClick={() => {}}
        />
      )}
    </>
  );
};

LayoutDisplay.defaultProps = {
  preview: false,
};

export default LayoutDisplay;
