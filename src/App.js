import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios'
import Formtable from './components/Formtable';
import Login from './components/Login';
import SignUp from './components/Signup';
import UserDetails from './components/userDetails';
import Product from './components/Product';
import Cart from './components/Cart';

axios.defaults.baseURL = 'https://backendfinal-u9mo.onrender.com/admin';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  return (
    <Router>
      <Routes>
        <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
        {/* <Route path="https://frontendfinal-5h94.onrender.com/admin" element={<Formtable />} /> */}
        <Route exact path="https://frontendfinal-5h94.onrender.com/sign-in" element={<Login />} />
        <Route exact path="https://frontendfinal-5h94.onrender.com/sign-up" element={<SignUp />} />
        <Route exact path="https://frontendfinal-5h94.onrender.com/userDetails" element={<UserDetails />} />

        <Route exact path="https://frontendfinal-5h94.onrender.com/product" element={<Product />} />
        <Route exact path="https://frontendfinal-5h94.onrender.com/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;