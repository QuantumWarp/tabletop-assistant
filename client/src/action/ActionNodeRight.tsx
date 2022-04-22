import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import RollCombo, { RollComboHelper } from '../models/roll-combo';
import './ActionNodeRight.css';
import ActionRollResultDialog from './dialogs/ActionRollResultDialog';
import { ActionTreeNode } from '../helpers/action-tree.helper';

interface ActionNodeRightProps {
  node: ActionTreeNode;
  updateNode: (node: ActionTreeNode) => void;
}

const ActionNodeRight = ({ node, updateNode }: ActionNodeRightProps) => {
  const [editComboResult, setEditComboResult] = useState<RollCombo | null>(null);

  const handleResultUpdate = (updatedCombo?: RollCombo) => {
    if (updatedCombo && editComboResult) {
      const index = node.results.indexOf(editComboResult);
      const newResults = [...node.results];
      newResults[index] = updatedCombo;
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
        const { min, max } = RollComboHelper.hasMinMax(res);

        return (
          <React.Fragment key={res.map((x) => x.id).join(',')}>
            <div
              className={`result${min ? ' min' : ''}${max ? ' max' : ''}`}
              onClick={() => setEditComboResult(res)}
            >
              {RollComboHelper.totalValue(res)}
            </div>

            <Divider orientation="vertical" />
          </React.Fragment>
        );
      })}

      {editComboResult && (
        <ActionRollResultDialog
          combo={editComboResult}
          open={Boolean(editComboResult)}
          onClose={handleResultUpdate}
        />
      )}
    </Box>
  );
};

export default ActionNodeRight;
