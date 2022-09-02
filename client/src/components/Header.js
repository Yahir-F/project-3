import React from 'react';
import Auth from '../utils/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';



function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Roguescape
          </Typography>
          <Button
            color="inherit"
            href='/'>
            Home
          </Button>
          <Button
            color="inherit"
            href='/Game'>
            Game
          </Button>

          {Auth.loggedIn() ? (
            <Button
              color='inherit'
              onClick={logout}
              href='/'>

              Logout
            </Button>
          ) : (

            <Button
              color='inherit'
              href='/login'>
              Login
            </Button>


          )}

        </Toolbar>

      </AppBar>

    </Box>
  );
}
export default Header;