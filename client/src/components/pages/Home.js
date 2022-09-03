import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";




function Home() {
  return (
    <React.Fragment>
    <CssBaseline />
    <Box sx={{color: "white", padding:'30px', }}>
    <Container maxWidth="sm" sx={{ margin: "20px auto", paddingTop: "50px" }}>
      <Box sx={{color: "lightblue", padding:'30px', }}>
        <Typography sx={{ textAlign: "center" }}>
          WELCOME TO ROGUESCAPE
          <br />
          INTRUCTIONS: <br />
          Movement: Arrow Keys Up,Down,Left,Right <br />
          Move Against Enemy to engage in Combat Fight enemies and Level Up{" "}
          <br />
          Only the Strongest Make it to the End!!! <br />
          This game was created for players with interests in Rougelike Games.{" "}
          <br sx={{ backgroundColor: "yellow" }} />
          CREATE AN ACCOUNT FOR THE BEST USER EXPERIENCE
        </Typography>
      </Box>
    </Container>
    </Box>
  </React.Fragment>
);
}


export default Home;