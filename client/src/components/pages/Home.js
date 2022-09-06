import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Home() {
  return (
    <Box sx={{ color: "white", padding: '30px', }}>
      <Container maxWidth="sm" sx={{ margin: "20px auto", paddingTop: "50px" }}>
        <Box sx={{ color: "lightblue", padding: '30px', textAlign: "center" }}>
          <Typography variant='h4' sx={{ color: 'white' }}>
            WELCOME TO ROGUESCAPE
          </Typography>
          <Typography variant='h5'>
            Only the Strongest Make it to the End!!!
          </Typography>
          <Typography variant='body2'>
            This game was created for players with interests in Roguelike Games.
            <br />
            CREATE AN ACCOUNT FOR THE BEST USER EXPERIENCE
          </Typography>
          <Typography variant='h6'>
            Instructions:
          </Typography>
          Movement: Arrow Keys <br />
          Blue = Player<br />
          Red = Enemies<br />
          Green = Health<br />
          Purple = Next Floor<br />
          Move Against enemies to engage in combat and gain XP
          <br />
          <Typography sx={{ fontWeight: 'bolder', color: 'white', marginTop: '10px' }}>
            Made by Sean Oh & Yahir Federico
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


export default Home;