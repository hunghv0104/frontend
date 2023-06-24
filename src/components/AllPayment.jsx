import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Table } from 'react-bootstrap';

const PaymentsComponent = () => {
  const [payments, setPayments] = useState([]);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  useEffect(() => {
    axios.get('https://backend-test-ad5x.onrender.com/user/allPayment')
    // axios.get('http://localhost:5000/user/allPayment')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
  {payments.length ? (
    <Card>
      
      <Card.Body>
        <a className="btn btn-primary" href='/menu'>
          Product Management
        </a>
        <div className='text-end'>
        <button onClick={logOut} className="btn btn-primary text-end">
          Log Out
        </button> 
        </div>
        <br />
        <Card.Title>All Payments</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='category-header'>Date</th>
              <th className='category-header'>Products</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>
                  <ul>
                    {payment.products.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  ) : (
    <p>No payments found.</p>
  )}
</div>
  );
};

export default PaymentsComponent;