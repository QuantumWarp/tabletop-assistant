import { Icon, listIcons } from '@iconify/react';
import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import iconifyMappings from './iconify-mappings';

interface IconifyDropdownProps {
  value?: string,
  onChange: (value?: string) => void,
}

const IconifyDropdown = ({ value, onChange }: IconifyDropdownProps) => {
  const [open, setOpen] = useState(false);

  const isOption = Object.keys(iconifyMappings).find((x) => iconifyMappings[x] === value);
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
      value={isOption || value}
      fullWidth
      freeSolo
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={Object.keys(iconifyMappings)}
      onInputChange={(_e, text) => onInputChange(text)}
      renderOption={(props, option: string) => (
         
        <Box {...props} component="li" key={iconifyMappings[option]}>
          <Icon style={{ marginRight: '18px' }} icon={iconifyMappings[option]} width={30} />
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
           
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
