import React from 'react';
import { Macro } from '@/common';
import './ActionNodeMacro.css';

interface ActionNodeMacroInputProps {
  macros: Macro[];
}

const ActionNodeMacroInput = ({ macros }: ActionNodeMacroInputProps) => (
  <div>
    {macros.length}
    {' '}
    values will be updated
  </div>
);

export default ActionNodeMacroInput;
