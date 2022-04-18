import { Icon, listIcons } from '@iconify/react';
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import iconifyMappings from './iconify-mappings';

interface IconifyDropdownProps {
  value?: string,
  onChange: (value?: string) => void,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IconifyDropdown = ({ value, onChange }: IconifyDropdownProps) => {
  const [open, setOpen] = useState(false);

  const isOption = Object.values(iconifyMappings).find((x) => x === value);
  const isLoaded = listIcons().find((x) => x === value);
  const loadedIcon = isOption || isLoaded;

  const onInputChange = (text: string) => {
    const keys = Object.keys(iconifyMappings);
    const key = keys.find((x) => x.toLowerCase() === text.toLowerCase());
    const newValue = key ? iconifyMappings[key] : text;
    onChange(newValue);
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={Object.keys(iconifyMappings)}
      onInputChange={(_e, text) => onInputChange(text)}
      renderOption={(props, option: string) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Box {...props} component="li" key={iconifyMappings[option]}>
          <Icon style={{ marginRight: '18px' }} icon={iconifyMappings[option]} width={30} />
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label="Icon"
          InputProps={{
            ...params.InputProps,
            startAdornment: value && (
              <InputAdornment position="start" sx={{ width: '30px' }}>
                {loadedIcon && <Icon style={{ marginLeft: '10px' }} icon={value} width={30} />}
                {!loadedIcon && open && <Box sx={{ width: '30px' }} />}
                {!loadedIcon && !open && <Icon style={{ marginLeft: '10px' }} icon={value} width={30} />}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

IconifyDropdown.defaultProps = {
  value: undefined,
};

export default IconifyDropdown;
