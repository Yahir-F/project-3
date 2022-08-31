import React from 'react'
import Auth from '../utils/auth'
import {Link} from 'react-router-dom'


function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
           <Link className="btn btn-lg btn-info m-2" to="/">
          Home
        </Link>
    {Auth.loggedIn() ? (
      <>
        <Link className="btn btn-lg btn-info m-2" to="/me">
          {Auth.getProfile().data.username}'s profile
        </Link>
        <button className="btn btn-lg btn-light m-2" onClick={logout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link className="btn btn-lg btn-info m-2" to="/login">
          Login/SignUp
        </Link>
      </>
    )}
  </div>
  )
    }

export default Navigation