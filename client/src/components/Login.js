import React, { useState } from "react";
// import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios'

const redirectDestination = '/bubbles'

const Login = (props) => {
  const [user, setUser] = useState({username: '', password: ''})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  function inputChangeHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function loginSubmitHandler(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', user)
      .then(res => {
        console.log({res})
        // set token in localstorage
        localStorage.setItem('token', JSON.stringify(res.data.payload))
        // redirect to protected area
        // const destination = props.redirTo ? props.redirTo : defaultRedirect;
        props.history.push(redirectDestination);
      })
      .catch(err => {
        console.log({err})
      })
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div className='login-form'>
        <p>Build a login page here</p>
        <form onSubmit={loginSubmitHandler} >
          <label htmlFor='username'>Username 
            <input type='text' name='username' id='username' onChange={inputChangeHandler} />
          </label>
          <label htmlFor='password'>Password 
            <input type='password' name='password' id='password' onChange={inputChangeHandler} />
          </label>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
