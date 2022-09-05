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
          <Typography variant='h4' sx={{color:'white'}}>
          WELCOME TO ROGUESCAPE
          <br />
          </Typography>
          INSTRUCTIONS: <br />
          Movement: Arrow Keys <br />
          Blue = Player<br />
          Red = Enemies<br />
          Green = Health<br />
          Purple = Next Floor<br />
          Move Against Enemy to engage in Combat and Gain XP{" "}
          <br />
          Only the Strongest Make it to the End!!! <br />
          This game was created for players with interests in Roguelike Games.{" "}
          <br  />
          CREATE AN ACCOUNT FOR THE BEST USER EXPERIENCE <br />
          <Typography sx={{fontWeight:'bolder', color:'white'}}>
          Made by Sean Oh & Yahir Federico
          </Typography>
        </Typography>
      </Box>
    </Container>
    </Box>
  </React.Fragment>
);
}


export default Home;