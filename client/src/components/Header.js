import React from 'react';
import Auth from '../utils/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import brick from "../images/brick2.jpg";
import logo from "../images/logo.png";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Setting the Header background to bricks */}
      <AppBar sx={{ backgroundImage: `url(${brick})` }} position="static">
        <Toolbar>
          <img src={logo} alt="logo" width='20px' height='20px'></img>
          <Box sx={{ flexGrow: 1 }}>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h6" component="span" sx={{ cursor: 'pointer', "&:hover": { color: 'gray' } }} /* onClick={event => window.location.href = '/'} */ >
                Roguescape
              </Typography>
            </Link>
          </Box>
          <Button color="inherit">
            {/* Removing the underline on the link text */}
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to='/game' style={{ textDecoration: 'none', color: 'white' }}>
              Game
            </Link>
          </Button>
          {/* Checks if user is logged in and changes what is visible  */}
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