import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  Computer as RunIcon,
} from '@mui/icons-material';
import { Macro } from 'tabletop-assistant-common';
import { useParams } from 'react-router-dom';
import ActionNodeMacroInput from './ActionNodeMacroInput';
import ActionNodeMacroOutput from './ActionNodeMacroOutput';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionNodeOutput from '../common/ActionNodeOutput';
import ActionTreeNode from '../../../models/action-tree-node';
import '../common/ActionNode.css';
import './ActionNodeMacro.css';
import ExpressionHelper from '../../../helpers/expression.helper';
import { useGetValueMapsQuery, useGetEntitiesQuery, useUpdateValueMapMutation } from '../../../store/api';
import { ResolvedMacro } from '../../../models/resolved-macro';

interface ActionNodeMacroProps {
  node: ActionTreeNode;
}

const ActionNodeMacro = ({ node }: ActionNodeMacroProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  const [updateValues] = useUpdateValueMapMutation();

  const [lastResults, setLastResults] = useState<ResolvedMacro[]>();
  const [runCount, setRunCount] = useState(0);

  const macros = node.action.macros as Macro[];

  const runMacros = () => {
    if (!entities || !valueMaps) return;
    const resolvedMacros = ExpressionHelper.resolveMacros(macros, valueMaps, entities);
    const updatedValuesList = ExpressionHelper.updateMacroValues(resolvedMacros, valueMaps);
    updatedValuesList.map((x) => updateValues(x));
    setLastResults(resolvedMacros);
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
