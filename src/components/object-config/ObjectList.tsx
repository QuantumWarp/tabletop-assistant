import {
  Button,
  Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper,
} from '@mui/material';
import React, { useState } from 'react';
import GameObject from '../../models/objects/game-object';
import { selectObjects } from '../../store/config-slice';
import { useAppSelector } from '../../store/store';
import ObjectUpdateDialog from './ObjectUpdateDialog';
import './ObjectList.css';
import TabletopIcon from '../common/TabletopIcon';

interface ObjectListProps {
  filter: string;
  onSelected: (obj: GameObject) => void;
}

const ObjectList = ({ filter, onSelected }: ObjectListProps) => {
  const objects = useAppSelector(selectObjects);
  const filteredObjs = objects.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()));
  const orderedObjs = filteredObjs.sort((a, b) => a.name.localeCompare(b.name));
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

      <Divider />

      <List className="object-list">
        {orderedObjs.map((obj) => (
          <ListItem
            key={obj.id}
            disablePadding
          >
            <ListItemButton onClick={() => onSelected(obj)}>
              <ListItemIcon>
                {obj.icon && <TabletopIcon icon={obj.icon} />}
              </ListItemIcon>

              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}

        {editObject && (
          <ObjectUpdateDialog
            obj={editObject}
            open={Boolean(editObject)}
            onClose={() => setEditObject(null)}
          />
        )}
      </List>
    </Paper>
  );
};

export default ObjectList;
