import {
  Box,
  Button,
  Divider,
  List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import GameAction from '../models/objects/game-action';
import { selectActions } from '../store/config-slice';
import { useAppSelector } from '../store/store';
import ActionUpdateDialog from './ActionUpdateDialog';
import './ObjectDetail.css';
import GameObject from '../models/objects/game-object';
import ObjectUpdateDialog from './ObjectUpdateDialog';
import LayoutDisplay from '../layout/LayoutDisplay';

interface ObjectDetailProps {
  obj: GameObject;
}

const ObjectDetail = ({ obj }: ObjectDetailProps) => {
  const actions = useAppSelector(selectActions);
  const objectActions = actions.filter((x) => x.objectId === obj.id);

  const [editObject, setEditObject] = useState<Partial<GameObject> | null>(null);
  const [editAction, setEditAction] = useState<Partial<GameAction> | null>(null);

  return (
    <Paper elevation={3}>
      <div className="action-list-header">
        <span className="title">Detail</span>

        <Button
          variant="outlined"
          onClick={() => setEditObject(obj)}
        >
          Edit
        </Button>
      </div>

      <Divider />

      <Stack spacing={2} padding={2}>
        <Typography variant="h5" component="div">
          {obj.name}
        </Typography>

        <Typography component="div">
          {obj.description}
        </Typography>

        <Box pb={2} display="flex" justifyContent="center">
          <LayoutDisplay
            display={obj.defaultDisplay}
            obj={obj}
            interactable={false}
          />
        </Box>

        <Divider />

        <Typography variant="h6" component="div" display="flex" justifyContent="space-between">
          Action List

          <Button
            variant="outlined"
            onClick={() => setEditAction({ objectId: obj.id })}
          >
            New
          </Button>
        </Typography>

        {objectActions.length === 0 && (
          <Typography display="flex" justifyContent="center">
            No Actions
          </Typography>
        )}

        <List>
          {objectActions.map((action) => (
            <ListItem
              key={action.id}
              disablePadding
            >
              <ListItemButton onClick={() => setEditAction(action)}>
                <ListItemText primary={action.name || 'Unnamed Action'} />
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

          {editAction && (
            <ActionUpdateDialog
              action={editAction}
              open={Boolean(editAction)}
              onClose={() => setEditAction(null)}
            />
          )}
        </List>
      </Stack>
    </Paper>
  );
};

export default ObjectDetail;
