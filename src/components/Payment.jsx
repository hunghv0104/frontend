import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const Payment = () => {
  const [payment, setPayment] = useState(null);
  var userId = window.localStorage.getItem('userId')
  useEffect(() => {
    axios.get(`https://backend-test-ad5x.onrender.com/user/payment?userId=${userId}`)
      .then((response) => {
        setPayment(response.data);
        console.log(payment)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {payment ? (
        <Card>
          <Card.Body>
            <Card.Title>Payment Details</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Date: {payment.date}</Card.Subtitle>

            <Card.Text>
              <h5>Products:</h5>
              <ul>
                {payment.products.map((product, index) => (
                  <li key={index}>{product.name}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading payment...</p>
      )}
    </div>
  );
};

export default Payment;