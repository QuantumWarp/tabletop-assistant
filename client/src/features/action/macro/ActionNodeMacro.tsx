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
import ActionTreeNode from '../../../models/action-tree-node';
import '../common/ActionNode.css';
import './ActionNodeMacro.css';
import useMappingHelper from '../../../helpers/hooks/use-mapping-update';
import { Mapping } from '../../../models/mapping';

interface ActionNodeMacroProps {
  node: ActionTreeNode;
}

const ActionNodeMacro = ({ node }: ActionNodeMacroProps) => {
  const [lastResults, setLastResults] = useState<Mapping[]>();
  const [runCount, setRunCount] = useState(0);

  const mappingHelper = useMappingHelper();

  const macros = node.action.macros as Macro[];

  const runMacros = () => {
    const updatedMappings = macros.map((macro) => {
      const result = mappingHelper.calculate(macro.expression);
      return { ...macro.target, value: result };
    });
    mappingHelper.update(updatedMappings);
    setLastResults(updatedMappings);
    setRunCount(runCount + 1);
  };

  return (
    <>
      <Box className="action-node">
        <ActionNodeInput node={node}>
          <ActionNodeMacroInput macros={macros} />
        </ActionNodeInput>

        <ActionNodeCenter onClick={runMacros}>
          <RunIcon />
        </ActionNodeCenter>

        <ActionNodeOutput node={node}>
          <ActionNodeMacroOutput
            runCount={runCount}
            lastResults={lastResults}
          />
        </ActionNodeOutput>
      </Box>
    </>
  );
};

export default ActionNodeMacro;
