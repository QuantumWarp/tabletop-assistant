import { useState } from 'react';
import { Box } from '@mui/material';
import {
  Computer as RunIcon,
} from '@mui/icons-material';
import { Macro } from '@tabletop-assistant/common';
import ActionNodeMacroInput from './ActionNodeMacroInput';
import ActionNodeMacroOutput from './ActionNodeMacroOutput';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionNodeOutput from '../common/ActionNodeOutput';
import ActionTreeNode from '../../../models/action-tree-node';
import '../common/ActionNode.css';
import './ActionNodeMacro.css';
import { useMappingExpressions } from '../../../helpers/hooks/use-mapping-expressions';
import { useUpdateValueMapMutation } from '../../../store/api';

interface ActionNodeMacroProps {
  node: ActionTreeNode;
}

const ActionNodeMacro = ({ node }: ActionNodeMacroProps) => {
  const [lastResults, setLastResults] = useState();
  const [runCount, setRunCount] = useState(0);
  const [updateMapping] = useUpdateValueMapMutation();

  const macros = node.action.macros as Macro[];

  const expressionResults = useMappingExpressions(macros.map((x) => x.expression), node.entity.id);

  const runMacros = () => {
    if (!expressionResults) return;
    // const updatedMappings = macros.map((macro, index) => ({
    //   ...macro.target,
    //   value: expressionResults[index].result,
    // }));
    // for (const mapping of updatedMappings) {
    //   updateMapping(mapping);
    // }
    // setLastResults(updatedMappings);
    // setRunCount(runCount + 1);
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
