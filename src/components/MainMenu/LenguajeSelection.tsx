
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import flags  from 'images/flags';
const FlagMenu = () => {
  
  const [flag, setFlag] = React.useState('10');
  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFlag(event.target.value);
  };
  return (
    <Box sx={{ maxWidth: 60, m:2 }}>
      <FormControl fullWidth>
        <Select
          id="flags-Lenguaje"
          value={flag}
          label ="10"
          variant="standard"
          onChange={handleChange}
  
          sx={{borderBottom: "none"}}
          
        >
          <MenuItem value={1}><img  style={{maxWidth:"25px"}} src={ flags.flag1 }  className="usFlag"/></MenuItem>
          <MenuItem value={2}><img  style={{maxWidth:"25px"}} src={ flags.flag2 }  className="usFlag"/></MenuItem>
          <MenuItem value={3}><img  style={{maxWidth:"25px"}} src={ flags.flag3 }  className="usFlag"/></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FlagMenu;