import React from 'react';
import { CreateEntity } from 'tabletop-assistant-common';
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
  entity: CreateEntity,
  mappings?: { [field: string]: any },
}

const LayoutDisplay = ({
  type, preview, entity, mappings,
}: LayoutDisplayProps) => {
  const slotValues = DisplayHelper.map(type, entity, mappings);

  return (
    <>
      {type === DisplayType.Card && (
        <DisplayCard
          preview={Boolean(preview)}
          slots={slotValues as CardDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Dots && (
        <DisplayDots
          preview={Boolean(preview)}
          slots={slotValues as DotsDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Square && (
        <DisplaySquare
          preview={Boolean(preview)}
          slots={slotValues as SquareDisplay}
          onClick={() => {}}
        />
      )}
      {type === DisplayType.Toggle && (
        <DisplayToggle
          preview={Boolean(preview)}
          slots={slotValues as ToggleDisplay}
          onClick={() => {}}
        />
      )}
    </>
  );
};

LayoutDisplay.defaultProps = {
  preview: undefined,
  mappings: undefined,
};

export default LayoutDisplay;
