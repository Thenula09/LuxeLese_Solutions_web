import React from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';
import './Home.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <h1>Find Your Perfect Ride</h1>
        <p>Discover our extensive collection of premium vehicles for any occasion</p>
        <div className="search-section">
          <SearchBar />
        </div>
      </div>
      <div className="homecard-section">
        <HomepageCard />
      </div>
      <div className='footerbar'>
        <Footer />
      </div>
    </>
  );
};

export default Home;