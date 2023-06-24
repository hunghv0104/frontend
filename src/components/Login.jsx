import React, { Component, useState } from "react";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
axios.defaults.baseURL = 'https://backend-test-ad5x.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000'
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
      window.location.href = './menu';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }

  return (
    // <div className="auth-wrapper m-5">
    //   <div className="auth-inner">
    //     <form onSubmit={handleSubmit}>
    //       <h3>Sign In</h3>

    //       <div className="mb-3">
    //         <label>Email address</label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           placeholder="Enter email"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Enter password"
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <div className="custom-control custom-checkbox">
    //           <input
    //             type="checkbox"
    //             className="custom-control-input"
    //             id="customCheck1"
    //           />
    //           <label className="custom-control-label" htmlFor="customCheck1">
    //             Remember me
    //           </label>
    //         </div>
    //       </div>

    //       <div className="d-grid">
    //         <button type="submit" className="btn btn-primary">
    //           Submit
    //         </button>
    //       </div>
    //       <p className="forgot-password text-right">
    //         <a href="/sign-up">Sign Up</a>
    //       </p>
    //     </form>
    //   </div>
    // </div>
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">We are The ATN Company</h4>
                    </div>

                    <form  onSubmit={handleSubmit}>
                      <p>Please login to your account</p>

                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example11" className="form-control"
                          placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example11">Username</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example22" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                          in</button>
                          <br />
                        <a className="text-muted" href="#!">Forgot password?</a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <a className="btn btn-outline-danger" href="sign-up">Create new</a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">We bring the best toys with high quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}