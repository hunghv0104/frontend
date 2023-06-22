import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Formtable from './components/Formtable';
import Login from './components/Login';
import SignUp from './components/Signup';
import UserDetails from './components/userDetails';
import Product from './components/Product';
import Cart from './components/Cart';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
        />
        <Route path="/admin" element={<Formtable />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;