import React, { useState } from 'react';
import {
  Divider,
  Drawer,
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
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Tabletop } from '@/common';
import './SideNav.css';
import TabletopUpsertDialog from '../features/tabletop/TabletopUpsertDialog';
import { useGetTabletopQuery } from '../store/api';

const SideNav = () => {
  const navigate = useNavigate();

  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: tabletop } = useGetTabletopQuery(tabletopId);

  const [editTabletop, setEditTabletop] = useState<Tabletop | undefined>();

  return (
    <Drawer variant="permanent" className="side-nav">
      <div className="top">
        {tabletop && (
          <ListItem
            className="top-item"
            button
            onClick={() => setEditTabletop(tabletop)}
          >
            <img
              className="top-item-image"
              src={tabletop.imageUrl}
              alt={tabletop.name}
            />

            <span className="top-item-text">
              {tabletop.shortName}
            </span>
          </ListItem>
        )}

        <Divider />

        {editTabletop && (
          <TabletopUpsertDialog
            initial={editTabletop}
            open={Boolean(editTabletop)}
            onClose={(deleted) => (deleted ? navigate('/') : setEditTabletop(undefined))}
          />
        )}

        <ListItem
          className="menu-item"
          component={NavLink}
          to="./layout"
        >
          <LayoutsIcon className="icon" />
          <span className="name">Layouts</span>
        </ListItem>

        <Divider />

        <ListItem
          className="menu-item"
          component={NavLink}
          to="./action"
        >
          <ActionIcon className="icon" />
          <span className="name">Action</span>
        </ListItem>

        <Divider />

        <ListItem
          className="menu-item"
          component={NavLink}
          to="./notes"
        >
          <NotesIcon className="icon" />
          <span className="name">Notes</span>
        </ListItem>

        <Divider />

        <ListItem
          className="menu-item"
          component={NavLink}
          to="./history"
        >
          <HistoryIcon className="icon" />
          <span className="name">History</span>
        </ListItem>

        <Divider />
      </div>

      <div className="bottom">
        <Divider />

        <ListItem
          className="thin-button"
          component={NavLink}
          to="./layout-config"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Configure" />
        </ListItem>

        <ListItem
          className="thin-button"
          component={NavLink}
          to="./objects"
        >
          <ListItemIcon>
            <ConfigureIcon />
          </ListItemIcon>
          <ListItemText primary="Objects" />
        </ListItem>

        <ListItem
          className="thin-button"
          onClick={() => navigate('/')}
        >
          <ListItemIcon>
            <SwitchIcon />
          </ListItemIcon>
          <ListItemText primary="Switch" />
        </ListItem>
      </div>
    </Drawer>
  );
};

export default SideNav;
