import {
  Outlet,
} from 'react-router-dom';
import { Box } from '@mui/material';
import SideNav from './SideNav';

const MainView = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainView;
