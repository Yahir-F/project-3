import React, { useState } from 'react';
import Auth from '../utils/auth';
import { loginUser } from '../utils/api';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';




const LoginForm = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('')

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const response = await loginUser(formState);
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message)
        return;
      }

      Auth.login(data.token);
    } catch (e) {
      console.log(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };
  return (
    <Card sx={{backgroundColor:'transparent'}}>
      <CardContent>
        <Typography sx={{ color: 'white', bgcolor: 'primary.main', padding: '20px' }} width='30%' margin='auto'>
          <Typography gutterBottom variant='h4' sx={{ display: 'flex', justifyContent: 'center' }}>Login</Typography>
          <Typography variant='body1' sx={{ display: 'flex', justifyContent: 'center' }}>Enter Login Info </Typography>
        </Typography>
        <Box component="form" sx={{ backgroundColor: 'whitesmoke', padding: '20px' }} width='30%' margin="auto">
          {errorMessage && (
            <Box bgcolor={(errorMessage === 'Submitted!') ? "#4caf50" : "#d32f2f"} padding='3px 8px' textAlign='center' color='white' borderRadius='4px' margin='0 0 8px 0'>
              <Typography variant='body1'>{errorMessage}</Typography>
            </Box>
          )}
          <InputLabel required sx={{ margin: '4px 0 2px 0' }}>Username </InputLabel>
          <TextField
            className='form-input'
            placeholder='username'
            value={formState.username}
            name="username"
            onChange={handleChange}
            type="text"
            variant="standard"
            sx={{ margin: '0 0 4px 0', width: '100%' }}
          />
          <InputLabel required sx={{ margin: '4px 0 2px 0' }}>password: </InputLabel>
          <TextField
            value={formState.password}
            placeholder='password'
            name="password"
            onChange={handleChange}
            type="password"
            variant="standard"
            sx={{ margin: '0 0 4px 0', width: '100%' }}
          />

          <Button variant='outlined'
            sx={{
              margin: '8px 0 0 0',
              borderColor: 'black',
              color: 'black',
              ":hover": {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
              }
            }}
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LoginForm;