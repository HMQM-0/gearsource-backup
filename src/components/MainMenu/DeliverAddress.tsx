import * as React from "react";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


export default function  DeliverAddress(defaultadress) {
     const [open, setOpen] = React.useState(true);
  return (
    <List sx={{ width: '100%'}}>
        <ListItem  disablePadding>
         <ListItemButton
                alignItems="center"
                onClick={() => setOpen(!open)}
                sx={{
                  bgcolor:"transparent",
                    '&:hover': {
                    background: "transparent",
                    },
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': {'& svg': { opacity: open ? 1 : 1} }
                }}
              >
          <Avatar sx={{bgcolor:"transparent", maxWidth:'36px', m:0}}>
             <FmdGoodOutlinedIcon htmlColor="#b9b9b9" />
          </Avatar>
        <ListItemText  primary="Deliver to" 
             primaryTypographyProps={{
                    fontSize: '12px',
                    fontWeight: 'normal',
                    lineHeight: '20px',
                    mb: '2px',
                    color: '#030404'
                  }}
        secondary="Argentina, CABA"  
            secondaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    mb: '2px',
                    color: '#030404'
                  }}
                  
        />
        <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 1,
                    transform: open ?  'rotate(0)':'rotate(-180deg)',
                    transition: '0.2s',
                    color: '#b9b9b9'
                  }}
                />
          </ListItemButton>
      </ListItem>
   
    </List>
  );
}


