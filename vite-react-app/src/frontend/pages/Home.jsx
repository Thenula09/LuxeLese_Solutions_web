import React, { useEffect } from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';
import './Home.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import VehicleTypes from '../components/VehicleTypes/VehicleTypes.jsx';

const Home = () => {
  useEffect(() => {
    // Initialize AOS animation library
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <h1>Find Your Perfect Ride</h1>
        <p>Discover our extensive collection of premium vehicles for any occasion</p>
      </div>
      <div className="homecard-section">
        <HomepageCard />
      </div>
      <VehicleTypes />
      <div className='footerbar'>
        <Footer />
      </div>
    </>
  );
};

export default Home;