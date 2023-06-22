import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://backendfinal-u9mo.onrender.com/admin');
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      const nameMatches = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatches = selectedCategory === 'All' || product.category === selectedCategory;
      return nameMatches && categoryMatches;
    });
  };

  const filteredProducts = filterProducts(products);

  const addToCart = (productId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      axios
        .post(
          'https://backendfinal-u9mo.onrender.com/user/cart',
          { productId, userId },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          alert('Added successfully');
          console.log(response.data.message);
        })
        .catch((error) => {
          console.log('Error details:', error.response.data);
          console.log('Failed to add to cart:', error);
        });
    } else {
      alert("You haven't logged in yet");
    }
  };

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="container">
      <h1 className="my-4">ATN Shop</h1>
      <a className="btn btn-danger" href={window.localStorage.getItem('loggedIn') ? '/userDetails' : '/sign-in'}>
        {window.localStorage.getItem('loggedIn') ? 'User detail' : 'Login'}
      </a>
      <a className="btn btn-success" href='/cart'>
        My cart
      </a>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col">
                <div className="card h-100">
                  <img src={`/images/${product.image}`} className="card-img-top" alt="Product" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
                    <p className="card-text flex-grow-1">{product.description}</p>
                    <button className="btn btn-warning mt-auto" onClick={() => addToCart(product._id)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;