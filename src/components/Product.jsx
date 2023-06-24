import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://backend-test-ad5x.onrender.com/admin');
      // const response = await axios.get('http://localhost:5000/admin');
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
          'https://backend-test-ad5x.onrender.com/user/cart',
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
    <div>
      <header id="productHeader" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="" className="logo d-flex align-items-center">
          <h1>
            ATN shop<span>.</span>
          </h1>
        </a>
        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a href="/menu" >
                Home
              </a>
            </li>
            <li>
              <a href="/sign-in">Log in</a>
            </li>
            <li>
              <a href="/product" className="active">Products</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <br /><br /><br /><br />

    <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://wallpapers.com/images/hd/toy-story-4-carnival-a06gs94b1uxnge3v.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.pixel4k.com/wp-content/uploads/2020/08/scoob-2020_1596930291.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.pixel4k.com/wp-content/uploads/2020/08/scoob-2020_1596930291.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<br /><br /><br />
    <div className="container">
      
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="list-group">
            <button
              className={`btn btn-outline-warning list-group-item list-group-item-action ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`btn btn-outline-warning list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="row mb-3">
  <div className="col-sm-8">
    <input
      type="text"
      className="form-control"
      placeholder="Search products"
      value={searchQuery}
      onChange={handleSearchInputChange}
    />
  </div>
  <div className="col-sm-2">
    <a className="btn btn-outline-danger" href={window.localStorage.getItem('loggedIn') ? '/menu' : '/sign-in'}>
      {window.localStorage.getItem('loggedIn') ? 'User detail' : 'Login'}
    </a>
  </div>
  <div className="col-sm-2">
    <a className="btn btn-outline-info" href="/cart">
      My cart
    </a>
  </div>
</div>
          <div className="productContainer">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col mb-3">
                <div className="card h-100 hoverCard">
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
    <br /><br />
    </div>
  );
};

export default ProductList;