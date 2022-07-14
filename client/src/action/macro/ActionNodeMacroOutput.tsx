import React from 'react';
import './ActionNodeMacro.css';

interface ActionNodeMacroOutputProps {
  macroResults: any[],
}

const ActionNodeMacroOutput = ({ macroResults }: ActionNodeMacroOutputProps) => (
  <div>{macroResults.length === 0 ? 'Not run' : 'Ran successfully'}</div>
);

export default ActionNodeMacroOutput;
