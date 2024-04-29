import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {Menu} from '@mui/icons-material/';
import { Box, IconButton } from '@mui/material';
import { LoginSignupButtons } from './LoginSignupButtons';

export default function MobileMenu() {
    const [openDrawer, setOpenDrawer] = React.useState(false)
  const toggleDrawer = (event) => {
    // if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') ) {
    //     return;
    // }
    setOpenDrawer(open=> !open)
  };
    
  return (
        <Box>
          <IconButton onClick={() => toggleDrawer()}><Menu/></IconButton>
          <SwipeableDrawer
            open={openDrawer}
            onClose={() => toggleDrawer()}
            onOpen={() => toggleDrawer()}
          >
            sfsfsdfsfsdfs <br />
            sfsfsdfsfsdfs <br />
            sfsfsdsAAAAAAAAAAAAA<br />
            sfsfsdfsfsdfs <br />
            sfsfsdfsfsdfs <br />
            sfsfsdfsfsdfs <br />
            sfsfsdfsfsdfs <br />
            <LoginSignupButtons/>
          </SwipeableDrawer>
        </Box>
  )
}
