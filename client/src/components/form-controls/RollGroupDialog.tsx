import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { RollComboGroup } from 'tabletop-assistant-common';
import ComputedInput from './ComputedInput';

interface RollGroupDialogProps {
  initial: RollComboGroup;
  open: boolean;
  onSave: (group: RollComboGroup) => void;
  onDelete: () => void;
  onClose: () => void;
}

const RollGroupDialog = ({
  initial, open, onSave, onClose, onDelete,
}: RollGroupDialogProps) => {
  const [numberType, setNumberType] = useState<string>(initial?.numberComputed ? 'computed' : 'static');
  const [facesType, setFacesType] = useState<string>(initial?.facesComputed ? 'computed' : 'static');

  const [isStatic, setStatic] = useState(initial?.static || false);
  const [negative, setNegative] = useState(initial?.negative || false);
  const [number, setNumber] = useState(initial?.number || 1);
  const [numberComputed, setNumberComputed] = useState(initial?.numberComputed || { expression: '1', variables: [] });
  const [faces, setFaces] = useState(initial?.faces || 6);
  const [facesComputed, setFacesComputed] = useState(initial?.facesComputed || { expression: '6', variables: [] });

  const formatAndSave = () => {
    onSave({
      static: isStatic,
      negative,
      number: numberType === 'static' ? number : undefined,
      numberComputed: numberType === 'static' ? undefined : numberComputed,
      faces: facesType === 'static' ? faces : undefined,
      facesComputed: facesType === 'static' ? undefined : facesComputed,
    });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <b>Setup Dice Group</b>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              label="Static"
              control={(
                <Checkbox
                  checked={isStatic}
                  onChange={(e) => setStatic(e.target.checked)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Negative"
              control={(
                <Checkbox
                  checked={negative}
                  onChange={(e) => setNegative(e.target.checked)}
                />
              )}
            />
          </Grid>

          {!isStatic && (
            <>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Number</FormLabel>
                  <RadioGroup
                    row
                    value={numberType}
                    onChange={(e) => setNumberType(e.target.value)}
                  >
                    <FormControlLabel value="static" control={<Radio />} label="Static" />
                    <FormControlLabel value="computed" control={<Radio />} label="Computed" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {numberType === 'static' && (
                  <TextField
                    fullWidth
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                  />
                )}
                {numberType === 'computed' && (
                  <ComputedInput
                    value={numberComputed}
                    onChange={(value) => setNumberComputed(value)}
                  />
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControl>
              <FormLabel>{isStatic ? 'Value' : 'Faces' }</FormLabel>
              <RadioGroup
                row
                value={facesType}
                onChange={(e) => setFacesType(e.target.value)}
              >
                <FormControlLabel value="static" control={<Radio />} label="Static" />
                <FormControlLabel value="computed" control={<Radio />} label="Computed" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {facesType === 'static' && (
              <TextField
                fullWidth
                type="number"
                value={faces}
                onChange={(e) => setFaces(Number(e.target.value))}
              />
            )}
            {facesType === 'computed' && (
              <ComputedInput
                value={facesComputed}
                onChange={(value) => setFacesComputed(value)}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {(initial.number || initial.numberComputed) && (
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => { onDelete(); onClose(); }}
          >
            Remove
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => formatAndSave()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RollGroupDialog;
