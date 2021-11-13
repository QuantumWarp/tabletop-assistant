import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import ObjectDetail from '../../components/object-config/ObjectDetail';
import ObjectList from '../../components/object-config/ObjectList';
import './ObjectConfigPage.css';
import TopBar from '../../components/common/TopBar';
import GameObject from '../../models/objects/game-object';

const ObjectConfigPage = () => {
  const [filter, setFilter] = useState('');
  const [selectedObject, setSelectedObject] = useState<GameObject | null>(null);

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
            <ObjectList
              filter={filter}
              onSelected={setSelectedObject}
            />
          </Grid>

          <Grid item xs={6}>
            {selectedObject && <ObjectDetail obj={selectedObject} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ObjectConfigPage;
