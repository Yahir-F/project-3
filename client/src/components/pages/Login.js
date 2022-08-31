import React from 'react';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
// import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';

function Login() {
  return (
    <div className='doesntmatter'>
      <LoginForm />
      <SignupForm />
    </div>
  );
}


export default Login;