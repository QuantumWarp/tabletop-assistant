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
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Tabletop } from 'tabletop-assistant-common';
import './SideNav.css';
import TabletopUpsertDialog from '../tabletop/TabletopUpsertDialog';
import { useGetTabletopQuery } from '../store/api';

const SideNav = () => {
  const history = useHistory();

  const { tabletopId } = useParams<{ tabletopId: string }>();
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
            onClose={(deleted) => (deleted ? history.push('/') : setEditTabletop(undefined))}
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

        <Divider />

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

        <Divider />

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

        <Divider />

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

        <Divider />
      </div>

      <div className="bottom">
        <Divider />

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
          <ListItemText primary="Configure" />
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
          <ListItemText primary="Objects" />
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
    </Drawer>
  );
};

export default SideNav;
