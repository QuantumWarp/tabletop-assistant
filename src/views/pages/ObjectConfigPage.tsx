import React, { useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import ObjectDetail from '../../components/object-config/ObjectDetail';
import ObjectList from '../../components/object-config/ObjectList';
import TopBar from '../../components/common/TopBar';
import GameObject from '../../models/objects/game-object';

const ObjectConfigPage = () => {
  const [filter, setFilter] = useState('');
  const [selectedObject, setSelectedObject] = useState<GameObject | null>(null);

  return (
    <>
      <TopBar title="Object Config">
        <TextField
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </TopBar>

      <Container sx={{ py: 2 }} maxWidth="lg">
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
      </Container>
    </>
  );
};

export default ObjectConfigPage;
