import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import { RollResult } from 'tabletop-assistant-common';
import './ActionNodeRight.css';
import ActionRollResultDialog from './dialogs/ActionRollResultDialog';
import { ActionTreeNode } from '../helpers/action-tree.helper';
import RollHelper from '../helpers/roll.helper';

interface ActionNodeRightProps {
  node: ActionTreeNode;
  updateNode: (node: ActionTreeNode) => void;
}

const ActionNodeRight = ({ node, updateNode }: ActionNodeRightProps) => {
  const [editComboResult, setEditComboResult] = useState<RollResult | null>(null);

  const handleResultUpdate = (updatedResult?: RollResult) => {
    if (updatedResult && editComboResult) {
      const index = node.results.indexOf(editComboResult);
      const newResults = [...node.results];
      newResults[index] = updatedResult;
      updateNode({
        ...node,
        results: newResults,
      });
    }
    setEditComboResult(null);
  };

  return (
    <Box
      className="action-node-right"
      sx={{
        borderColor: 'custom.action.border',
        backgroundColor: 'custom.action.background',
      }}
    >
      {[...node.results].reverse().map((res) => {
        const { min, max } = RollHelper.hasMinMax(res);

        return (
          <>
            <div
              className={`result${min ? ' min' : ''}${max ? ' max' : ''}`}
              onClick={() => setEditComboResult(res)}
            >
              {RollHelper.totalValue(res)}
            </div>

            <Divider orientation="vertical" />
          </>
        );
      })}

      {editComboResult && (
        <ActionRollResultDialog
          result={editComboResult}
          open={Boolean(editComboResult)}
          onClose={handleResultUpdate}
        />
      )}
    </Box>
  );
};

export default ActionNodeRight;
