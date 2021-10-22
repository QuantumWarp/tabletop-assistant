import {
  Button,
  List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React, { useState } from 'react';
import GameObject from '../../models/objects/game-object';
import { selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import ObjectUpdateDialog from './ObjectUpdateDialog';
import './ObjectList.css';

interface ObjectListProps {
  filter: string;
}

const ObjectList = ({ filter }: ObjectListProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const filteredObjs = gameObjects
    .filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const [editObject, setEditObject] = useState<Partial<GameObject> | null>(null);

  return (
    <Paper elevation={3}>
      <div className="object-list-header">
        <span className="title">Objects</span>

        <Button
          variant="outlined"
          onClick={() => setEditObject({})}
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
            gameObject={editObject}
            open={Boolean(editObject)}
            onClose={() => setEditObject(null)}
          />
        )}
      </List>
    </Paper>
  );
};

export default ObjectList;
