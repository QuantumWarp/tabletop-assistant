import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { ResolvedRollCombo } from 'tabletop-assistant-common';
import ActionNodeRollInput from '../roll/ActionNodeRollInput';
import './ActionRollDialog.css';

interface ActionRollDialogProps {
  combo: ResolvedRollCombo;
  open: boolean;
  onUpdate: (updatedCombo: ResolvedRollCombo, rollNow?: boolean) => void;
  onClose: () => void;
}

const ActionRollDialog = ({
  combo, open, onUpdate, onClose,
}: ActionRollDialogProps) => {
  const [updatedCombo, setUpdatedCombo] = useState(combo);

  const updateStaticValue = (value: number) => {
    setUpdatedCombo(updatedCombo.filter((x) => !x.static)
      .concat([{
        faces: value, static: true, negative: false, number: 1,
      }]));
  };

  const addToCombo = (faces: number) => {
    const firstNegative = updatedCombo.find((x) => x.faces === faces && x.negative);
    if (firstNegative) {
      setUpdatedCombo(updatedCombo.filter((x) => x !== firstNegative));
    } else {
      setUpdatedCombo([
        ...updatedCombo,
        {
          faces, static: false, negative: false, number: 1,
        },
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
        {
          faces, negative: true, static: false, number: 1,
        },
      ]);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Setup Roll</b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ActionNodeRollInput combo={updatedCombo} />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Static Value"
              value={updatedCombo.filter((x) => x.static).reduce((sum, a) => sum + a.faces, 0)}
              onChange={(e) => updateStaticValue(Number(e.target.value))}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => { onUpdate(updatedCombo); onClose(); }} variant="outlined">
          Apply
        </Button>

        <Button onClick={() => { onUpdate(updatedCombo, true); onClose(); }} variant="outlined">
          Roll Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionRollDialog;
