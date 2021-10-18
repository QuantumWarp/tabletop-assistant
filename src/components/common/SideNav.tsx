import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Autorenew as SwitchIcon,
  BackupTable as LayoutsIcon,
  Casino as ActionIcon,
  History as HistoryIcon,
  Note as NotesIcon,
  SettingsApplications as ConfigureIcon,
} from '@mui/icons-material';
import { NavLink, useHistory } from 'react-router-dom';
import './SideNav.css';
import { useAppSelector } from '../../store/store';
import { selectConfiguration } from '../../store/configuration-slice';

const MainView = () => {
  const history = useHistory();
  const configuration = useAppSelector(selectConfiguration);

  return (
    <div className="side-nav">
      <div className="top">
        <ListItem className="top-item" button>
          <img
            className="top-item-image"
            src={configuration?.img}
            alt={configuration?.name}
          />

          <span className="top-item-text">
            {configuration?.shortName}
          </span>
        </ListItem>

        <ListItem
          button
          className="menu-item"
          activeClassName="Mui-selected"
          component={NavLink}
          to="./layout"
        >
          <LayoutsIcon className="icon" />
          <span className="name">Layouts</span>
        </ListItem>

        <ListItem
          button
          className="menu-item"
          activeClassName="Mui-selected"
          component={NavLink}
          to="./notes"
        >
          <NotesIcon className="icon" />
          <span className="name">Notes</span>
        </ListItem>

        <ListItem
          button
          className="menu-item"
          activeClassName="Mui-selected"
          component={NavLink}
          to="./action"
        >
          <ActionIcon className="icon" />
          <span className="name">Action</span>
        </ListItem>

        <ListItem
          button
          className="menu-item"
          activeClassName="Mui-selected"
          component={NavLink}
          to="./history"
        >
          <HistoryIcon className="icon" />
          <span className="name">History</span>
        </ListItem>
      </div>

      <div className="bottom">
        <ListItem
          button
          activeClassName="Mui-selected"
          component={NavLink}
          to="./layout-config"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Layout Config" />
        </ListItem>

        <ListItem
          button
          activeClassName="Mui-selected"
          component={NavLink}
          to="./object-config"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Object Config" />
        </ListItem>

        <ListItem
          button
          className="menu-item"
          onClick={() => history.push('/')}
        >
          <SwitchIcon className="icon" />
          <span className="name">Switch</span>
        </ListItem>
      </div>
    </div>
  );
};

export default MainView;
