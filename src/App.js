import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/index'

import axios from 'axios'
import Formtable from './components/Formtable';
import Login from './components/Login';
import SignUp from './components/Signup';
import UserDetails from './components/userDetails';
import Product from './components/Product';
import Cart from './components/Cart';
import Payment from './components/Payment';
import AllPayment from './components/AllPayment'
import Index from './components/Index'

axios.defaults.baseURL = 'https://backend-test-ad5x.onrender.com/admin';
// axios.defaults.baseURL = 'http://localhost:5000/admin'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  const role = window.localStorage.getItem("role")
  return (
    <Router>
      <Routes>
        <Route
            path="/menu"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
        {/* <Route path="https://frontendfinal-5h94.onrender.com/admin" element={<Formtable />} /> */}
        <Route path="/product" element={<Product />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/menu" element={<UserDetails />} /> */}
        <Route path="/cart" element={<Cart />} />

        <Route 
            path="/payment" 
            element={role == "Admin" ? <AllPayment /> : <Payment/>} />

        <Route path="/allPayment" element={<AllPayment />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;