import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import ActionList from '../../components/object-config/ActionList';
import ObjectList from '../../components/object-config/ObjectList';
import './ObjectConfigPage.css';
import TopBar from '../../components/common/TopBar';

const ObjectConfigPage = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="object-config-page">
      <TopBar title="Object Config">
        <div className="object-config-controls">
          <TextField
            label="Search"
            variant="standard"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </TopBar>

      <div className="object-config-content">
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <ObjectList filter={filter} />
          </Grid>

          <Grid item xs={6}>
            <ActionList filter={filter} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ObjectConfigPage;
