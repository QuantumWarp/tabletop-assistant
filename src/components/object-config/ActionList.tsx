import {
  Button,
  List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import { v4 as guid } from 'uuid';
import React, { useState } from 'react';
import GameAction from '../../models/objects/game-action';
import { selectActions, selectGameObjects, upsertAction } from '../../store/configuration-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ActionUpdateDialog from './ActionUpdateDialog';
import './ActionList.css';

interface ActionListProps {
  filter: string;
}

const ActionList = ({ filter }: ActionListProps) => {
  const dispatch = useAppDispatch();
  const gameObjects = useAppSelector(selectGameObjects);
  const actions = useAppSelector(selectActions);
  const filteredActions = actions
    .filter((action) => {
      const obj = gameObjects.find((x) => x.id === action.objectId);
      return action.name?.toLowerCase().includes(filter.toLowerCase())
        || obj?.name.toLowerCase().includes(filter.toLowerCase());
    });
  const [editAction, setEditAction] = useState<GameAction | null>(null);

  return (
    <Paper elevation={3}>
      <div className="action-list-header">
        <span className="title">Actions</span>

        <Button
          variant="outlined"
          onClick={() => setEditAction({
            id: guid(),
            objectId: '',
            triggers: [],
          })}
        >
          New
        </Button>
      </div>

      <List>
        {filteredActions.map((action) => {
          const obj = gameObjects.find((x) => x.id === action.objectId);

          return (
            <ListItem disablePadding>
              <ListItemButton onClick={() => setEditAction(action)}>
                <ListItemText primary={`${action.name || 'Action'} (${obj?.name})`} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {editAction && (
          <ActionUpdateDialog
            currentAction={editAction}
            open={Boolean(editAction)}
            onUpdate={(action) => dispatch(upsertAction(action))}
            onClose={() => setEditAction(null)}
          />
        )}
      </List>
    </Paper>
  );
};

export default ActionList;
