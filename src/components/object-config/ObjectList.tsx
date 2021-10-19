import {
  Button,
  List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import { v4 as guid } from 'uuid';
import React, { useState } from 'react';
import GameObject from '../../models/objects/game-object';
import { selectGameObjects, upsertObject } from '../../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ObjectUpdateDialog from './ObjectUpdateDialog';
import './ObjectList.css';

interface ObjectListProps {
  filter: string;
}

const ObjectList = ({ filter }: ObjectListProps) => {
  const dispatch = useAppDispatch();
  const gameObjects = useAppSelector(selectGameObjects);
  const filteredObjs = gameObjects
    .filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const [editObject, setEditObject] = useState<GameObject | null>(null);

  return (
    <Paper elevation={3}>
      <div className="object-list-header">
        <span className="title">Objects</span>

        <Button
          variant="outlined"
          onClick={() => setEditObject({
            id: guid(),
            name: '',
          })}
        >
          New
        </Button>
      </div>

      <List>
        {filteredObjs.map((obj) => (
          <ListItem disablePadding>
            <ListItemButton onClick={() => setEditObject(obj)}>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}

        {editObject && (
          <ObjectUpdateDialog
            currentObject={editObject}
            open={Boolean(editObject)}
            onUpdate={(obj) => dispatch(upsertObject(obj))}
            onClose={() => setEditObject(null)}
          />
        )}
      </List>
    </Paper>
  );
};

export default ObjectList;
