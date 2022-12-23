import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import {
  Save as SaveIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { RollCombo, RollComboGroup } from 'tabletop-assistant-common';
import ActionNodeRollInput from '../features/action/roll/ActionNodeRollInput';
import RollHelper from '../helpers/roll.helper';

interface RollDialogProps {
  initial: RollCombo;
  open: boolean;
  onSave: (roll: RollCombo) => void;
  onDelete: () => void;
  onClose: () => void;
}

const RollDialog = ({
  initial, open, onSave, onDelete, onClose,
}: RollDialogProps) => {
  const [updatedCombo, setUpdatedCombo] = useState(initial);

  const addToCombo = (faces: number, negative = false, isStatic = false) => {
    const addGroup: RollComboGroup = {
      number: 1, faces, negative, static: isStatic,
    };
    const newCombo = updatedCombo.concat(addGroup);
    const simplified = RollHelper.simplifyCombo(newCombo);
    const sorted = simplified.sort(RollHelper.compareComboGroup);
    setUpdatedCombo(sorted);
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
                <Icon icon="mdi:dice-d4-outline" onClick={() => addToCombo(4, true)} />
                <Icon icon="mdi:dice-d6-outline" onClick={() => addToCombo(6, true)} />
                <Icon icon="mdi:dice-d8-outline" onClick={() => addToCombo(8, true)} />
                <Icon icon="mdi:dice-d10-outline" onClick={() => addToCombo(10, true)} />
                <Icon icon="mdi:dice-d12-outline" onClick={() => addToCombo(12, true)} />
                <Icon icon="mdi:dice-d20-outline" onClick={() => addToCombo(20, true)} />
              </div>
            </div>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => onDelete()}
        >
          Clear
        </Button>

        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => onSave(initial)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RollDialog;
