import React from 'react';
import {
  Divider,
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
import './SideNav.css';

const MainView = () => {
  const history = useHistory();

  return (
    <div className="side-nav">
      <List>
        <ListItem button onClick={() => history.push('./layout')}>
          <ListItemIcon>
            <LayoutsIcon />
          </ListItemIcon>
          <ListItemText primary="Layouts" />
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

        <Divider />

        <ListItem button onClick={() => history.push('./layout-config')}>
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Layout Config" />
        </ListItem>

        <ListItem button onClick={() => history.push('./object-config')}>
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Object Config" />
        </ListItem>
      </List>
    </div>
  );
};

export default MainView;
