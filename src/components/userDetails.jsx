import React, { Component, useEffect, useState } from "react";
import axios from 'axios'

import Formtable from "./Formtable";
import UserHome from "./userHome.jsx";


export default function UserDetails() {
 // axios.defaults.baseURL = 'http://localhost:5000/user';
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    

axios.post('http://localhost:5000/user/userData', {
  token: window.localStorage.getItem('token'),
})
  .then((response) => {
    const data = response.data;
    console.log(data, 'userData');
    if (data.data.userType === 'Admin') {
      setAdmin(true);
    }

    setUserData(data.data);

    if (data.data === 'token expired') {
      alert('Token expired, please login again');
      window.localStorage.clear();
      window.location.href = './sign-in';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }, []);

  return admin ? <Formtable /> : <UserHome userData={userData} />;
}