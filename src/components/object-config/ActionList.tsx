import {
  Button,
  List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React, { useState } from 'react';
import GameAction from '../../models/objects/game-action';
import { selectActions, selectGameObjects } from '../../store/configuration-slice';
import { useAppSelector } from '../../store/store';
import ActionUpdateDialog from './ActionUpdateDialog';
import './ActionList.css';

interface ActionListProps {
  filter: string;
}

const ActionList = ({ filter }: ActionListProps) => {
  const gameObjects = useAppSelector(selectGameObjects);
  const actions = useAppSelector(selectActions);
  const filteredActions = actions
    .filter((action) => {
      const obj = gameObjects.find((x) => x.id === action.objectId);
      return action.name?.toLowerCase().includes(filter.toLowerCase())
        || obj?.name.toLowerCase().includes(filter.toLowerCase());
    });
  const [editAction, setEditAction] = useState<Partial<GameAction> | null>(null);

  return (
    <Paper elevation={3}>
      <div className="action-list-header">
        <span className="title">Actions</span>

        <Button
          variant="outlined"
          onClick={() => setEditAction({})}
        >
          New
        </Button>
      </div>

      <List>
        {filteredActions.map((action) => {
          const obj = gameObjects.find((x) => x.id === action.objectId);

          return (
            <ListItem
              key={action.id}
              disablePadding
            >
              <ListItemButton onClick={() => setEditAction(action)}>
                <ListItemText primary={`${action.name || 'Action'} (${obj?.name})`} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {editAction && (
          <ActionUpdateDialog
            action={editAction}
            open={Boolean(editAction)}
            onClose={() => setEditAction(null)}
          />
        )}
      </List>
    </Paper>
  );
};

export default ActionList;
