import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import brick from "../images/brick2.jpg";

function Footer() {
  return (
    <Box sx={{ flexGrow: 1, position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '2.5rem' }}>
      <AppBar sx={{ backgroundImage: `url(${brick})` }} position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ justifyContent: 'center' }} margin='auto'>
            {/* Redirects to repo when clicking on Github icon */}
            <Link href='https://github.com/Yahir-F/roguescape' target='_blank'>
              <GitHubIcon sx={{ "&:hover": { color: 'purple', cursor: 'pointer' }, color: 'white' }} />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Footer;