import React from 'react';
import Auth from '../utils/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import brick from "../images/brick2.jpg"

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Setting the Header background to a Brick */}
      <AppBar sx={{ backgroundImage: `url(${brick})` }} position="static">
        <Toolbar>
          <Box

            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, backgroundImage: `url(${brick})` }}
          >
          </Box>
          <Typography variant="h6" sx={{flexGrow:1}} onClick={event =>  window.location.href='/'}>
            <Typography sx={{"&:hover":{color:'gray', cursor:'grab'}}}>
            Roguescape
            </Typography>
          </Typography>
          <Button color="inherit">
            {/* Removing the underline on the button due to Links Nature */}
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to='/game' style={{ textDecoration: 'none', color: 'white' }}>
              Game
            </Link>
          </Button>
          {/* Checks if user is logged in and changes visible  */}
          {Auth.loggedIn() ? (
            <Button
              color='inherit'
              onClick={logout}
              href='/'>
              Logout
            </Button>
          ) : (
            <Button color='inherit'>
              <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                Login
              </Link>
            </Button>
          )}

        </Toolbar>

      </AppBar>

    </Box>
  );
}
export default Header;