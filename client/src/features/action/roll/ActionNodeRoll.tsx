import React, { useState } from 'react';
import { Expression, RollResult } from 'tabletop-assistant-common';
import { Box } from '@mui/material';
import {
  Casino as RollIcon,
} from '@mui/icons-material';
import './ActionNodeRoll.css';
import ActionNodeRollInput from './ActionNodeRollInput';
import ActionNodeInput from '../common/ActionNodeInput';
import ActionNodeCenter from '../common/ActionNodeCenter';
import ActionNodeOutput from '../common/ActionNodeOutput';
import ActionRollDialog from '../dialogs/ActionRollDialog';
import ActionTreeNode from '../../../models/action-tree-node';
import ActionNodeRollOutput from './ActionNodeRollOutput';
import RollHelper from '../../../helpers/roll.helper';
import ActionRollResultDialog from '../dialogs/ActionRollResultDialog';
import '../common/ActionNode.css';
import { useMappingExpressions } from '../../../helpers/hooks/use-mapping-expressions';

interface ActionNodeRollProps {
  node: ActionTreeNode;
}

const ActionNodeRoll = ({ node }: ActionNodeRollProps) => {
  const [editRoll, setEditRoll] = useState(false);
  const [editResult, setEditResult] = useState<RollResult | null>(null);

  const expressions = node.action.roll?.reduce(
    (arr, x) => {
      let newArr = arr;
      if (x.facesComputed) newArr = arr.concat(x.facesComputed);
      if (x.numberComputed) newArr = arr.concat(x.numberComputed);
      return newArr;
    },
    [] as Expression[],
  ) || [];

  const expressionResults = useMappingExpressions(expressions, node.entity._id);

  const [roll, setRoll] = useState(
    node.action.roll && expressionResults
      && RollHelper.resolveComputed(node.action.roll, expressionResults),
  );
  const [results, setResults] = useState([] as RollResult[]);

  if (!roll) return (<div>Invalid Roll</div>);

  const rollAction = () => {
    const result = RollHelper.roll(roll);
    setResults(results.concat([result]));
  };

  const handleResultUpdate = (updatedResult: RollResult) => {
    if (!editResult) return;

    const index = results.indexOf(editResult);
    const newResults = [...results];
    newResults[index] = updatedResult;
    setResults(newResults);
  };

  return (
    <>
      <Box className="action-node">
        <ActionNodeInput
          node={node}
          onClick={() => setEditRoll(true)}
        >
          <ActionNodeRollInput combo={roll} />
        </ActionNodeInput>

        <ActionNodeCenter onClick={rollAction}>
          <RollIcon />
        </ActionNodeCenter>

        <ActionNodeOutput node={node}>
          <ActionNodeRollOutput
            results={results}
            onResultClick={(result) => setEditResult(result)}
          />
        </ActionNodeOutput>
      </Box>

      {editRoll && (
        <ActionRollDialog
          combo={roll}
          open={editRoll}
          onUpdate={setRoll}
          onClose={() => setEditRoll(false)}
        />
      )}

      {editResult && (
        <ActionRollResultDialog
          result={editResult}
          open={Boolean(editResult)}
          onUpdate={handleResultUpdate}
          onClose={() => setEditResult(null)}
        />
      )}
    </>
  );
};

export default ActionNodeRoll;
