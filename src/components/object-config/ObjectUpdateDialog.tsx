import React, { useState } from 'react';
import { v4 as guid } from 'uuid';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import GameObject from '../../models/objects/game-object';
import { useAppDispatch } from '../../store/store';
import { deleteObject, upsertObject } from '../../store/config-slice';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import TabletopIcon, { TabletopIconType } from '../common/TabletopIcon';
import './ObjectUpdateDialog.css';
import ObjectExampleLayout from './ObjectExampleLayout';

interface ObjectUpdateDialogProps {
  obj?: Partial<GameObject>;
  open: boolean;
  onClose: (obj?: GameObject) => void;
}

const ObjectUpdateDialog = ({ obj = {}, open, onClose }: ObjectUpdateDialogProps) => {
  const dispatch = useAppDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [name, setName] = useState(obj.name || '');
  const [disabled, setDisabled] = useState(obj.disabled || false);
  const [icon, setIcon] = useState(obj.icon || '');
  const [description, setDescription] = useState(obj.description || '');

  const [value, setValue] = useState(obj.fields?.value);
  const [secondaryValue, setSecondaryValue] = useState(obj.fields?.secondaryValue);
  const [title, setTitle] = useState(obj.fields?.title);
  const [text, setText] = useState(obj.fields?.text);
  const [toggle, setToggle] = useState(obj.fields?.toggle);
  const [secondaryToggle, setSecondaryToggle] = useState(obj.fields?.secondaryToggle);

  const getUpdatedObject = () => ({
    name,
    disabled,
    icon: icon as TabletopIconType,
    description,
    fields: {
      value,
      secondaryValue,
      title,
      text,
      toggle,
      secondaryToggle,
    },
  });

  const saveObject = () => {
    const updatedObject = {
      id: obj?.id || guid(),
      ...getUpdatedObject(),
    };
    dispatch(upsertObject(updatedObject));
    onClose(updatedObject);
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Update Object</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} marginTop={0}>
          <Grid item container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Icon</InputLabel>
                  <Select
                    label="Icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  >
                    {Object.values(TabletopIconType).map((x) => (
                      <MenuItem
                        key={x}
                        value={x}
                      >
                        <div className="icon-menu-item">
                          <TabletopIcon icon={x as TabletopIconType} />
                          <span>{x}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={disabled}
                      onChange={(e) => setDisabled(e.target.checked)}
                    />
                  )}
                  label="Disabled"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="h6">
                Fields
              </Typography>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Value"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Secondary Value"
                  value={secondaryValue}
                  onChange={(e) => setSecondaryValue(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  label="Toggle"
                  control={(
                    <Checkbox
                      checked={toggle}
                      onChange={(e) => setToggle(e.target.checked)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  label="Secondary Toggle"
                  control={(
                    <Checkbox
                      checked={secondaryToggle}
                      onChange={(e) => setSecondaryToggle(e.target.checked)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <ObjectExampleLayout
              obj={getUpdatedObject()}
            />
          </Grid>
        </Grid>
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
