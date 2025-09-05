import React from 'react';
import HomepageCard from '../components/homepagecard/homepagecard.jsx';

const Home = () => {
  // Dummy car data
  const car = {
      name: 'Tesla Model S',
      image: 'https://via.placeholder.com/300x200.png?text=Tesla+Model+S',
      price: '$79,990',
    };

  return (
    <>
      <div className="my-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Featured Model</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <HomepageCard car={car} />
        </div>
      </div>
    </>
  );
};

export default Home;