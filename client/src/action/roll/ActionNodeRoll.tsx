import React, { useState } from 'react';
import { RollCombo, RollResult } from 'tabletop-assistant-common';
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
import { ActionTreeNode } from '../../helpers/action-tree.helper';
import ActionNodeRollOutput from './ActionNodeRollOutput';
import RollHelper from '../../helpers/roll.helper';
import ActionRollResultDialog from '../dialogs/ActionRollResultDialog';
import '../common/ActionNode.css';

interface ActionNodeRollProps {
  node: ActionTreeNode;
}

const ActionNodeRoll = ({ node }: ActionNodeRollProps) => {
  const [editRoll, setEditRoll] = useState(false);
  const [editResult, setEditResult] = useState<RollResult | null>(null);

  const [roll, setRoll] = useState(node.action.roll as RollCombo);
  const [results, setResults] = useState([] as RollResult[]);

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
          <ActionNodeRollInput
            combo={roll}
          />
        </ActionNodeInput>

        <ActionNodeCenter onClick={rollAction}>
          <RollIcon />
        </ActionNodeCenter>

        <ActionNodeOutput>
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
