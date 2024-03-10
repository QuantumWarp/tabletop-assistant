import React, { useState } from 'react';
import {
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
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
import { NavLink, useNavigate } from 'react-router-dom';
import './SideNav.css';
import { useAppSelector } from '../../store/store';
import { selectConfigId, selectInfo } from '../../store/config-slice';
import ConfigUpdateDialog from '../config-info/ConfigUpdateDialog';
import ConfigInfo from '../../models/config-info';

const SideNav = () => {
  const navigate = useNavigate();
  const configId = useAppSelector(selectConfigId);
  const info = useAppSelector(selectInfo);
  const [editInfo, setEditInfo] = useState<ConfigInfo | null>(null);

  return (
    <Drawer variant="permanent" className="side-nav">
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

        <Divider />

        {editInfo && (
          <ConfigUpdateDialog
            info={editInfo}
            configId={configId}
            open={Boolean(editInfo)}
            onClose={() => setEditInfo(null)}
          />
        )}

        <ListItemButton
          className="menu-item"
          component={NavLink}
          to="./layout"
        >
          <LayoutsIcon className="icon" />
          <span className="name">Layouts</span>
        </ListItemButton>

        <Divider />

        <ListItemButton
          className="menu-item"
          component={NavLink}
          to="./notes"
        >
          <NotesIcon className="icon" />
          <span className="name">Notes</span>
        </ListItemButton>

        <Divider />

        <ListItemButton
          className="menu-item"
          component={NavLink}
          to="./action"
        >
          <ActionIcon className="icon" />
          <span className="name">Action</span>
        </ListItemButton>

        <Divider />

        <ListItemButton
          className="menu-item"
          component={NavLink}
          to="./history"
        >
          <HistoryIcon className="icon" />
          <span className="name">History</span>
        </ListItemButton>

        <Divider />
      </div>

      <div className="bottom">
        <Divider />

        <ListItemButton
          className="thin-button"
          component={NavLink}
          to="./layout-config"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Layout Config" />
        </ListItemButton>

        <ListItemButton
          className="thin-button"
          component={NavLink}
          to="./object-config"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Object Config" />
        </ListItemButton>

        <ListItemButton
          className="thin-button"
          onClick={() => navigate('/')}
        >
          <ListItemIcon>
            <SwitchIcon />
          </ListItemIcon>
          <ListItemText primary="Switch" />
        </ListItemButton>
      </div>
    </Drawer>
  );
};

export default SideNav;
