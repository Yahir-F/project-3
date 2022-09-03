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
      <AppBar sx={{backgroundImage: `url(${brick})`}} position="static">
        <Toolbar>
          <Box
        
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 , backgroundImage: `url(${brick})`}}
          >
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Roguescape
          </Typography>
          <Button color="inherit">
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to='/game' style={{ textDecoration: 'none', color: 'white' }}>
              Game
            </Link>
          </Button>

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