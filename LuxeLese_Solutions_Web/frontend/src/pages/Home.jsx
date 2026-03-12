import React, { useEffect, useState } from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';
import './Home.css';
import Footer from '../components/Footer/footer.jsx';
import VehicleTypes from '../components/VehicleTypes/VehicleTypes.jsx';
import ServiceBar from '../components/ServiceBar/ServiceBar.jsx';
import Tranding from '../components/Tranding/tranding.jsx';
import MemorableMoments from '../components/MemorableMoments/memorable_moments.jsx';
import WelcomeBox from '../components/WelcomeBox/WelcomeBox.jsx';
import Loading from './Loading.jsx';


const Home = () => {
  const [showLoading, setShowLoading] = useState(() => {
    // Only show loading if not shown before in this session
    return !window.localStorage.getItem('luxelese_loading_shown');
  });

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        window.localStorage.setItem('luxelese_loading_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  useEffect(() => {
    // Initialize AOS animation library only after loading finishes
    if (!showLoading && window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, [showLoading]);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <div className="welcome-text">
            <h2 className="company-name">Welcome To</h2>
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

      <div className="section-divider">
        <div className="animated-line">
          <div className="line-segment"></div>
          <div className="line-segment"></div>
          <div className="line-segment"></div>
        </div>
      </div>

     

      <div className='footerbar'>
        <Footer />
      </div>
    </>
  );
};

export default Home;