import { Divider, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface TopBarProps {
  title: string;
  children: ReactNode;
}

const TopBar = ({ title, children }: TopBarProps) => (
  <>
    <Stack
      sx={{ width: '100%', p: 1 }}
      direction="row"
      alignItems="center"
    >
      <Typography
        sx={{ minWidth: 280 }}
        variant="h4"
        fontWeight="bold"
        align="center"
      >
        {title}
      </Typography>

      <Stack flex="1" direction="row" justifyContent="space-between">{children}</Stack>
    </Stack>

    <Divider />
  </>
);

export default TopBar;
