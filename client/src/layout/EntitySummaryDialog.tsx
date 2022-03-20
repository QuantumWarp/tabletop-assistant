import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import GameObject from '../models/objects/game-object';
import { selectActions, setAction } from '../store/config-slice';

interface ObjectInfoDialogProps {
  obj: GameObject,
  open: boolean;
  onClose: () => void;
}

const ObjectInfoDialog = ({ obj, open, onClose }: ObjectInfoDialogProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const actions = useAppSelector(selectActions);
  const objActions = actions.filter((x) => x.objectId === obj.id);
  const firstAction = objActions?.find((action) => action.triggers.find((x) => x.manual));

  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
      <DialogTitle>
        <b>{obj.name}</b>
      </DialogTitle>

      <DialogContent>
        <Typography>
          {obj.description || obj.fields.text}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Close
        </Button>

        {firstAction && (
          <Button onClick={() => { dispatch(setAction(firstAction)); history.push('./action'); }} variant="outlined">
            {firstAction.name}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ObjectInfoDialog;
