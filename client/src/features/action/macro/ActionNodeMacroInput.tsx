import { Macro } from '@tabletop-assistant/common';

interface ActionNodeMacroInputProps {
  macros: Macro[];
}

export function ActionNodeMacroInput({ macros }: ActionNodeMacroInputProps) {
  return (
    <div>
      {macros.length}
      {' '}
      values will be updated
    </div>
  );
};
