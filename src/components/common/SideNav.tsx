import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  BackupTable as LayoutsIcon,
  Casino as ActionIcon,
  History as HistoryIcon,
  Note as NotesIcon,
  SettingsApplications as ConfigureIcon,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const MainView = () => {
  const history = useHistory();

  return (
    <Drawer
      open
      variant="persistent"
    >
      <List>
        <ListItem button onClick={() => history.push('./layout')}>
          <ListItemIcon>
            <LayoutsIcon />
          </ListItemIcon>
          <ListItemText primary="Layouts" />
        </ListItem>

        <ListItem button onClick={() => history.push('./configure')}>
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Configure" />
        </ListItem>

        <ListItem button onClick={() => history.push('./notes')}>
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItem>

        <ListItem button onClick={() => history.push('./action')}>
          <ListItemIcon>
            <ActionIcon />
          </ListItemIcon>
          <ListItemText primary="Action" />
        </ListItem>

        <ListItem button onClick={() => history.push('./history')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MainView;
