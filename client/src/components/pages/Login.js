import React from 'react'
// import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';

function Login() {
  return (
    <div className='doesntmatter'>
    <div className="log-form">
    <h2>Login</h2>
    <form>
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
       className="btn">Login</button>
    </form>
  </div>
  


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