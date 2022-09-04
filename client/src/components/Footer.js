import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import brick from "../images/brick2.jpg"

function Footer() {
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <AppBar sx={{backgroundImage: `url(${brick})`}} position="static">
        <Toolbar>
          <Box
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </Box>
          <Typography variant="h6" sx={{ justifyContent: 'center' }} margin='auto'>
            {/* Redirects User page when clicking on Github */}
          <GitHubIcon sx={{"&:hover":{color:'purple', cursor:'grab'}}}onClick={event =>  window.location.href='https://github.com/Yahir-F/roguescape'} />

          </Typography>
        

        </Toolbar>

      </AppBar>

    </Box>
  );
}
export default Footer;