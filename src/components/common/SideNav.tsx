import React, { useState } from 'react';
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
  Settings as ConfigureIcon,
} from '@mui/icons-material';
import { NavLink, useHistory } from 'react-router-dom';
import './SideNav.css';
import { useAppSelector } from '../../store/store';
import { selectConfigId, selectInfo } from '../../store/config-slice';
import ConfigUpdateDialog from '../config-info/ConfigUpdateDialog';
import ConfigInfo from '../../models/config-info';

const SideNav = () => {
  const history = useHistory();
  const configId = useAppSelector(selectConfigId);
  const info = useAppSelector(selectInfo);
  const [editInfo, setEditInfo] = useState<ConfigInfo | null>(null);

  return (
    <div className="side-nav">
      <div className="top">
        <ListItem
          className="top-item"
          button
          onClick={() => setEditInfo(info)}
        >
          <img
            className="top-item-image"
            src={info.image}
            alt={info.name}
          />

          <span className="top-item-text">
            {info.shortName}
          </span>
        </ListItem>

        {editInfo && (
          <ConfigUpdateDialog
            info={editInfo}
            configId={configId}
            open={Boolean(editInfo)}
            onClose={() => setEditInfo(null)}
          />
        )}

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
          className="thin-button"
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
          className="thin-button"
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
          className="thin-button"
          onClick={() => history.push('/')}
        >
          <ListItemIcon>
            <SwitchIcon />
          </ListItemIcon>
          <ListItemText primary="Switch" />
        </ListItem>
      </div>
    </div>
  );
};

export default SideNav;
