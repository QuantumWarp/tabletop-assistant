import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GameObject from '../../models/objects/game-object';
import { useAppDispatch } from '../../store/store';
import { deleteObject, upsertObject } from '../../store/config-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';

interface ObjectUpdateDialogProps {
  obj?: Partial<GameObject>;
  open: boolean;
  onClose: (obj?: GameObject) => void;
}

const ObjectUpdateDialog = ({ obj = {}, open, onClose }: ObjectUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(obj.name || '');
  const [icon, setIcon] = useState(obj.icon || '');
  const [description, setDescription] = useState(obj.description || '');

  const [value, setValue] = useState(obj.fields?.value);
  const [maxValue, setMaxValue] = useState(obj.fields?.maxValue);
  const [title, setTitle] = useState(obj.fields?.title);
  const [text, setText] = useState(obj.fields?.text);
  const [disabled, setDisabled] = useState(obj.fields?.disabled);

  const saveObject = () => {
    const updatedObject = {
      id: obj?.id || guid(),
      name,
      icon: icon as TabletopIconType,
      description,
      fields: {
        value,
        maxValue,
        title,
        text,
        disabled,
      },
    };
    dispatch(upsertObject(updatedObject));
    onClose(updatedObject);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Object</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          fullWidth
          label="Icon"
          variant="standard"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        >
          {Object.values(TabletopIconType).map((x) => (
            <MenuItem
              key={x}
              value={x}
            >
              <TabletopIcon icon={x as TabletopIconType} />
              {x}
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="Description"
          variant="standard"
          multiline
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        Fields

        <TextField
          fullWidth
          type="number"
          label="Value"
          variant="standard"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TextField
          fullWidth
          type="number"
          label="Max Value"
          variant="standard"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />

        <TextField
          fullWidth
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Text"
          variant="standard"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <FormControlLabel control={<Checkbox value={disabled} onChange={(e) => setDisabled(e.target.checked)} />} label="Disabled" />
      </DialogContent>

      <DialogActions>
        {obj.id && (
          <>
            <Button onClick={() => setDeleteOpen(true)} color="error" variant="outlined">
              Delete
            </Button>

            <DeleteConfirmDialog
              objType="Object"
              objName={obj.name}
              open={deleteOpen}
              onDelete={() => { dispatch(deleteObject(obj.id as string)); onClose(); }}
              onClose={() => setDeleteOpen(false)}
            />
          </>
        )}

        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button onClick={saveObject} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ObjectUpdateDialog.defaultProps = {
  obj: {},
};

export default ObjectUpdateDialog;
