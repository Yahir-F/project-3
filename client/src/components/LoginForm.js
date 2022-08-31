import React, { useState } from 'react';
import Auth from '../utils/auth';
import { loginUser } from '../utils/api';

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
      if(!response.ok){
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


    <div className="log-form">
      <h2>Login</h2>
        <p>{errorMessage}</p>
      <form onSubmit={handleFormSubmit}>
        <input
          className='form-input'
          placeholder="username"
          name='username'
          value={formState.username}
          onChange={handleChange}
          type="text"
        />
        <input
          name='password' className='form-input'
          placeholder="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          type="submit"

          className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;