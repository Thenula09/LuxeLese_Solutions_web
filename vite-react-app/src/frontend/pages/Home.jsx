import React, { useEffect } from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';
import './Home.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import VehicleTypes from '../components/VehicleTypes/VehicleTypes.jsx';
import ServiceBar from '../components/ServiceBar/ServiceBar.jsx';
import Tranding from '../components/Tranding/tranding.jsx';
import MemorableMoments from '../components/MemorableMoments/memorable_moments.jsx';
import WelcomeBox from '../components/WelcomeBox/WelcomeBox.jsx';

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
        <div className="hero-content">
          <div className="welcome-text">
            <h2 className="company-name">Welcome to</h2>
            <h1 className="luxelese">Luxelese Solution</h1>
            <p>Discover our extensive collection of premium vehicles for any occasion</p>
            
             <div className="section-divider">
        <div className="animated-line">
          <div className="line-segment"></div>
          <div className="line-segment"></div>
          <div className="line-segment"></div>
        </div>
      </div>
          </div>
         
          <div className="welcome-box-container">
            <WelcomeBox />
          </div>
          
        </div>
      </div>

     

      <div className="ServiceBar-section">
        <ServiceBar />
      </div>

      <div className="section-divider">
        <div className="animated-line">
          <div className="line-segment"></div>
          <div className="line-segment"></div>
          <div className="line-segment"></div>
        </div>
      </div>

      <div className="trending-section-wrapper">
        <Tranding />
      </div>

      <div className="section-divider">
        <div className="animated-line">
          <div className="line-segment"></div>
          <div className="line-segment"></div>
          <div className="line-segment"></div>
        </div>
      </div>

      <div className="vehicle-types-section">
        <VehicleTypes />
      </div>

      <div className="section-divider">
        <div className="animated-line">
          <div className="line-segment"></div>
          <div className="line-segment"></div>
          <div className="line-segment"></div>
        </div>
      </div>

      <div className="memorable-moments-section">
        <MemorableMoments />
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