import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <Link className="btn btn-lg btn-info m-2" to="/">
        Home
      </Link>
      <Link className="btn btn-lg btn-info m-2" to="/game">
        Game
      </Link>
      {Auth.loggedIn() ? (
        <>
          <Link className="btn btn-lg btn-info m-2" to="/me">
            {Auth.getProfile().data.username}'s profile
          </Link>
          <button className="btn btn-lg btn-light m-2" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="btn btn-lg btn-info m-2" to="/login">
            Login/SignUp
          </Link>
        </>
      )}
    </div>
  );
}

export default Navigation;