import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { v4 as guid } from 'uuid';
import { Icon } from '@iconify/react';
import ActionRoll from '../content/ActionRoll';
import Note from '../../../models/notes/note';
import { useAppSelector } from '../../../store/store';
import { selectActions } from '../../../store/config-slice';
import RollCombo from '../../../models/rolling/roll-combo';
import './ActionRollDialog.css';

interface ActionRollDialogProps {
  combo: RollCombo;
  open: boolean;
  onClose: (note?: Note) => void;
}

const ActionRollDialog = ({ combo, open, onClose }: ActionRollDialogProps) => {
  const gameActions = useAppSelector(selectActions);
  const [updatedCombo, setUpdatedCombo] = useState(combo);

  const addToCombo = (faces: number) => {
    const firstNegative = updatedCombo.find((x) => x.faces === faces && x.negative);
    if (firstNegative) {
      setUpdatedCombo(updatedCombo.filter((x) => x !== firstNegative));
    } else {
      setUpdatedCombo([
        ...updatedCombo,
        { id: guid(), faces },
      ]);
    }
  };

  const removeFromCombo = (faces: number) => {
    const firstPositive = updatedCombo.find((x) => x.faces === faces && !x.negative);
    if (firstPositive) {
      setUpdatedCombo(updatedCombo.filter((x) => x !== firstPositive));
    } else {
      setUpdatedCombo([
        ...updatedCombo,
        { id: guid(), faces, negative: true },
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Setup Roll</b>
        {gameActions.length}
      </DialogTitle>

      <DialogContent>
        <ActionRoll combo={updatedCombo} />

        <div className="common-dice">
          <div className="row">
            <span className="title">Add</span>
            <Icon icon="mdi:dice-d4" onClick={() => addToCombo(4)} />
            <Icon icon="mdi:dice-d6" onClick={() => addToCombo(6)} />
            <Icon icon="mdi:dice-d8" onClick={() => addToCombo(8)} />
            <Icon icon="mdi:dice-d10" onClick={() => addToCombo(10)} />
            <Icon icon="mdi:dice-d12" onClick={() => addToCombo(12)} />
            <Icon icon="mdi:dice-d20" onClick={() => addToCombo(20)} />
          </div>

          <div className="row">
            <span className="title">Remove</span>
            <Icon icon="mdi:dice-d4-outline" onClick={() => removeFromCombo(4)} />
            <Icon icon="mdi:dice-d6-outline" onClick={() => removeFromCombo(6)} />
            <Icon icon="mdi:dice-d8-outline" onClick={() => removeFromCombo(8)} />
            <Icon icon="mdi:dice-d10-outline" onClick={() => removeFromCombo(10)} />
            <Icon icon="mdi:dice-d12-outline" onClick={() => removeFromCombo(12)} />
            <Icon icon="mdi:dice-d20-outline" onClick={() => removeFromCombo(20)} />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Apply
        </Button>

        <Button onClick={() => onClose()} variant="outlined">
          Roll Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionRollDialog;
