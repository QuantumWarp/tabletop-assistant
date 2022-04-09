import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';
import RollCombo, { RollComboHelper } from '../models/rolling/roll-combo';
import './ActionNodeRight.css';
import ActionRollResultDialog from './dialogs/ActionRollResultDialog';
import { ActionTreeNode } from '../helpers/action.helper';

interface ActionNodeRightProps {
  node: ActionTreeNode;
}

const ActionNodeRight = ({ node }: ActionNodeRightProps) => {
  const [editComboResult, setEditComboResult] = useState<RollCombo | null>(null);

  const handleResultUpdate = (updatedCombo?: RollCombo) => {
    if (updatedCombo && editComboResult) {
      // updateRollResult({
      //   actionId: node.action.id,
      //   resultIndex: node.results.indexOf(editComboResult),
      //   combo: updatedCombo,
      // });
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
          <>
            <div
              key={res.map((x) => x.id).join(',')}
              className={`result${min ? ' min' : ''}${max ? ' max' : ''}`}
              onClick={() => setEditComboResult(res)}
            >
              {RollComboHelper.totalValue(res)}
            </div>

            <Divider orientation="vertical" />
          </>
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
