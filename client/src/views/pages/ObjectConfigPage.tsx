import React, { useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import ObjectDetail from '../../components/object-config/ObjectDetail';
import ObjectList from '../../components/object-config/ObjectList';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../store/store';
import { selectObjects } from '../../store/config-slice';

const ObjectConfigPage = () => {
  const objects = useAppSelector(selectObjects);
  const [filter, setFilter] = useState('');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const selectedObject = objects.find((x) => x.id === selectedObjectId);

  return (
    <>
      <TopBar title="Object Config">
        <TextField
          sx={{ minWidth: 400 }}
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
              onSelected={setSelectedObjectId}
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
