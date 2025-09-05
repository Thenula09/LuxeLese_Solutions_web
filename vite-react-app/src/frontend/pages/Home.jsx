import React from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';
import './Home.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';

const Home = () => {
  // Dummy car data

  return (
    <>
      <Navbar />
      <div className="my-8">
        <div className='homecard'>
          <HomepageCard />
        </div>
      </div>
      <div className='footerbar'>
      <Footer />
      </div>
    </>
  );
};

export default Home;