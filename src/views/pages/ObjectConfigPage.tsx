import React, { useState } from 'react';
import { TextField } from '@mui/material';
import ActionList from '../../components/object-config/ActionList';
import ObjectList from '../../components/object-config/ObjectList';
import './ObjectConfigPage.css';

const ObjectConfigPage = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="object-config-page">
      <TextField
        label="Search"
        variant="filled"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="lists">
        <ObjectList filter={filter} />
        <ActionList filter={filter} />
      </div>
    </div>
  );
};

export default ObjectConfigPage;
