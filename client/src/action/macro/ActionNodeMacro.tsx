import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  Computer as RunIcon,
} from '@mui/icons-material';
import { Macro } from 'tabletop-assistant-common';
import ActionNodeMacroInput from './ActionNodeMacroInput';
import ActionNodeMacroOutput from './ActionNodeMacroOutput';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionNodeOutput from '../common/ActionNodeOutput';
import { ActionTreeNode } from '../../helpers/action-tree.helper';
import '../common/ActionNode.css';
import './ActionNodeMacro.css';

interface ActionNodeMacroProps {
  node: ActionTreeNode;
}

const ActionNodeMacro = ({ node }: ActionNodeMacroProps) => {
  const [macroResults, setMacroResults] = useState<any[]>([]);

  const macros = node.action.macros as Macro[];

  const runMacros = () => {
    // TODO
    setMacroResults([1]);
  };

  return (
    <>
      <Box className="action-node">
        <ActionNodeInput
          node={node}
        >
          <ActionNodeMacroInput
            macros={macros}
          />
        </ActionNodeInput>

        <ActionNodeCenter onClick={runMacros}>
          <RunIcon />
        </ActionNodeCenter>

        <ActionNodeOutput>
          <ActionNodeMacroOutput
            macroResults={macroResults}
          />
        </ActionNodeOutput>
      </Box>
    </>
  );
};

export default ActionNodeMacro;
