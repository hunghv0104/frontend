import React from 'react';

function Header() {
  return (
    <header id="header" className="header d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="" className="logo d-flex align-items-center">
          {/* Uncomment the line below if you also wish to use an image logo */}
          {/* <img src="assets/img/logo.png" alt="" /> */}
          <h1>
            ATN shop<span>.</span>
          </h1>
        </a>
        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a href="/menu" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="/sign-in">Log in</a>
            </li>
            <li>
              <a href="/product">Products</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="hero">
      <div className="info d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 data-aos="fade-down">
                Welcome to <span>ATN shop</span>
              </h2>
              <p data-aos="fade-up">
                Let's buy some greatest toys in the world
              </p>
              <a data-aos="fade-up" data-aos-delay="200" href="/product" className="btn-get-started">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="hero-carousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-item active" style={{ backgroundImage: 'url(https://www.pixel4k.com/wp-content/uploads/2018/12/spider-verse-cartoon-art-4k_1546276246.jpg)' }}></div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Header />
      <HeroSection />
      {/* Add other sections/components here */}
    </div>
  );
}

export default Index;