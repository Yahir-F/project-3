import React from 'react'
import LoginForm from '../LoginForm'
// import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';

function Login() {
  return (
    <div className='doesntmatter'>
   <LoginForm/>
  


    <div className="sign-form">
    <h2>SignUp</h2>
    <form>
    <input 
      className='form-input'
      placeholder= "email"
      type="email" 
      // value={}  
      // onChange={} 
      />
      <input
      className='form-input'
      placeholder= "username"
      name='username'
      // value={}
      // onChange={}
       type="text" 
        />
      <input 
      className='form-input'
      placeholder= "password"
      type="password" 
      // value={}  
      // onChange={} 
      />
      <button 
      type="submit"
       className="btn">SignUp</button>
    </form>
  </div>
  </div>
  )
}


export default Login;