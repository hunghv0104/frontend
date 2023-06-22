import React, { Component, useState } from "react";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
axios.defaults.baseURL = 'http://localhost:5000';

axios.post('/user/login-user', {
  email,
  password,
})
  .then((response) => {
    const data = response.data;
    console.log(data, 'userRegister');
    if (data.status === 'ok') {
      alert('Login successful');
      window.localStorage.setItem('token', data.data.token);
      window.localStorage.setItem('loggedIn', true);
      window.localStorage.setItem('userId', data.data.userId);
      window.location.href = './userDetails';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  return (
    <div className="auth-wrapper m-5">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}