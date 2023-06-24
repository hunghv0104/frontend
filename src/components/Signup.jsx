import React, { Component, useState } from "react";
import axios from 'axios';

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "Hungdz2002") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(fname, lname, email, password);
      axios.defaults.baseURL = 'https://backend-test-ad5x.onrender.com';

axios.post('/user/register', {
  fname,
  email,
  lname,
  password,
  userType,
})
  .then((response) => {
    const data = response.data;
    console.log(data, 'userRegister');
    if (data.status === 'ok') {
      alert('Registration Successful');
    } else {
      alert('Something went wrong');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    }
  };

  return (
    // <div className="auth-wrapper">
    //   <div className="auth-inner">
    //     <form onSubmit={handleSubmit}>
    //       <h3>Sign Up</h3>
    //       <div>
    //         Register As
            // <input
            //   type="radio"
            //   name="UserType"
            //   value="User"
            //   onChange={(e) => setUserType(e.target.value)}
            // />
    //         User
    //         <input
    //           type="radio"
    //           name="UserType"
    //           value="Admin"
    //           onChange={(e) => setUserType(e.target.value)}
    //         />
    //         Admin
    //       </div>
          // {userType == "Admin" ? (
          //   <div className="mb-3">
          //     <label>Secret Key</label>
          //     <input
          //       type="text"
          //       className="form-control"
          //       placeholder="Secret Key"
          //       onChange={(e) => setSecretKey(e.target.value)}
          //     />
          //   </div>
          // ) : null}

    //       <div className="mb-3">
    //         <label>First name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="First name"
    //           onChange={(e) => setFname(e.target.value)}
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <label>Last name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Last name"
    //           onChange={(e) => setLname(e.target.value)}
    //         />
    //       </div>

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

    //       <div className="d-grid">
    //         <button type="submit" className="btn btn-primary">
    //           Sign Up
    //         </button>
    //       </div>
    //       <p className="forgot-password text-right">
    //         Already registered <a href="/sign-in">sign in?</a>
    //       </p>
    //     </form>
    //   </div>
    // </div>

    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="firstName" className="form-control form-control-lg" onChange={(e) => setFname(e.target.value)}/>
                        <label className="form-label" htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="lastName" className="form-control form-control-lg" onChange={(e) => setLname(e.target.value)}/>
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Register as: </h6>
                        <input className="form-check-input" type="radio"
                        name="UserType"
                        value="User"
                        onChange={(e) => setUserType(e.target.value)}/>
                        <label className="form-check-label" htmlFor="femaleGender">&nbsp;User &nbsp; &nbsp;</label>
                        <input className="form-check-input" type="radio"
                          name="UserType"
                          value="Admin"
                          onChange={(e) => setUserType(e.target.value)}/>
                        <label className="form-check-label" htmlFor="femaleGender">&nbsp;Admin</label>
                    </div>
                      {userType == "Admin" ? (
                          <div className="mb-3">
                            <label>Secret Key</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Secret Key"
                              onChange={(e) => setSecretKey(e.target.value)}
                            />
                          </div>
                        ) : null}
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input type="email" id="emailAddress" className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)}/>
                        <label className="form-label" htmlFor="emailAddress">Email</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input type="password" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="phoneNumber">Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>&nbsp;&nbsp;
                    <a href="/sign-in" className="btn btn-warning btn-lg">Login Now</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}