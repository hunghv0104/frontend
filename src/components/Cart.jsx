import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');

const handlePayment = () => {
  const token = window.localStorage.getItem('token');
  if (token) {
    axios
      .post('https://backend-test-ad5x.onrender.com/user/payment', {
        userId: userId,
        products: cart
      }, {
        headers: {
          Authorization: token
        }
      })
      .then((response) => {
        setCart([]); // Clear the cart
        setPaymentStatus('success'); // Set payment status to success
        console.log(response.data.message);
      })
      .catch((error) => {
        setPaymentStatus('error'); // Set payment status to error
        console.log('Payment error:', error);
      });
  } else {
    console.log('User not logged in');
  }
};

  const userId = window.localStorage.getItem('userId');
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    
    if (token) {
      axios.get(`https://backend-test-ad5x.onrender.com/user/cart`, {
        headers: {
          Authorization: token
        },
        params: {
          userId: userId
        }
      })
        .then((response) => {
          setCart(response.data.cart.products);
        })
        .catch((error) => {
          console.log('Fetch cart error:', error);
        });
    }
  }, []);

  const removeFromCart = (productId) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      axios.delete(`https://backend-test-ad5x.onrender.com/user/cart/${productId}`, {
        headers: {
          Authorization: token
        }, 
        params: {
          userId: userId
        }
      })
        .then((response) => {
          console.log(response.data.message);
          setCart(cart.filter((product) => product._id !== productId));
        })
        .catch((error) => {
          console.log('Remove from cart error:', error);
        });
    } else {
      console.log('User not logged in');
    }
  };

  // Function to group products by ID and calculate total quantity and total price
  const groupProducts = () => {
  const groupedProducts = {};
  let totalPrice = 0;

  cart.forEach((product) => {
    if (!groupedProducts[product._id]) {
      groupedProducts[product._id] = {
        ...product,
        quantity: 1
      };
    } else {
      groupedProducts[product._id].quantity += 1;
    }
  });

  Object.values(groupedProducts).forEach((product) => {
    product.totalPrice = product.quantity * product.price;
    totalPrice += product.totalPrice;
  });

  return {
    products: Object.values(groupedProducts),
    totalPrice: totalPrice.toFixed(2)
  };
};

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groupProducts().products.map((product) => (
              <tr key={product._id}>
                <td>
                 <img src={`${product.image}`} alt="" width="100" height="100"/>
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>${product.totalPrice}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeFromCart(product._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4"></td>
              <td>Total Price: ${groupProducts().totalPrice}</td>
              <td>
               <button className="btn btn-primary" onClick={handlePayment}>
                 Pay
               </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};

export default Cart;