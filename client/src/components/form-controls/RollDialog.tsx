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
import { RollCombo, RollComboGroup } from '@/common';
import ActionNodeRollInput from '../../features/action/roll/ActionNodeRollInput';
import RollHelper from '../../helpers/roll.helper';
import RollGroupDialog from './RollGroupDialog';

interface RollDialogProps {
  initial: RollCombo;
  open: boolean;
  onSave: (roll: RollCombo) => void;
  onClose: () => void;
}

const RollDialog = ({
  initial, open, onSave, onClose,
}: RollDialogProps) => {
  const [updatedCombo, setUpdatedCombo] = useState(initial);
  const [selectedGroup, setSelectedGroup] = useState<RollComboGroup>();

  const updateCombo = (newCombo: RollCombo) => {
    const simplified = RollHelper.simplifyCombo(newCombo);
    const sorted = simplified.sort(RollHelper.compareComboGroup);
    setSelectedGroup(undefined);
    setUpdatedCombo(sorted);
  };

  const addToCombo = (faces: number, negative = false, isStatic = false) => {
    const addGroup: RollComboGroup = {
      number: 1, faces, negative, static: isStatic,
    };
    const newCombo = updatedCombo.concat(addGroup);
    updateCombo(newCombo);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Setup Roll</b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ActionNodeRollInput
              combo={updatedCombo}
              selected={selectedGroup}
              onGroupClick={(x) => setSelectedGroup(x)}
            />
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

              <div className="row">
                <span className="title">Static</span>
                <span onClick={() => addToCombo(1, false, true)}>+1</span>
                <span onClick={() => addToCombo(1, true, true)}>-1</span>
                <span onClick={() => addToCombo(5, false, true)}>+5</span>
                <span onClick={() => addToCombo(5, true, true)}>-5</span>
                <span onClick={() => addToCombo(10, false, true)}>+10</span>
                <span onClick={() => addToCombo(10, true, true)}>-10</span>
              </div>
            </div>
          </Grid>
        </Grid>

        {selectedGroup && (
          <RollGroupDialog
            initial={selectedGroup}
            open={Boolean(selectedGroup)}
            onSave={(newGroup) => updateCombo(updatedCombo
              .filter((x) => x !== selectedGroup)
              .concat([newGroup]))}
            onDelete={() => updateCombo(updatedCombo.filter((x) => x !== selectedGroup))}
            onClose={() => setSelectedGroup(undefined)}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setSelectedGroup({})}
        >
          Add Group
        </Button>

        <Button
          variant="outlined"
          onClick={() => setUpdatedCombo([])}
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
