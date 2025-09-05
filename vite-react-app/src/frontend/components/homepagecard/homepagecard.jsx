import React from 'react';
import './homepagecard.css';

const HomepageCard = ({ car }) => {
  return (
    <div className="card">
      <img src={car.image} alt={car.name} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{car.name}</h2>
        <p className="card-price">{car.price}</p>
        <button className="card-button">View Details</button>
      </div>
    </div>
  );
};

export default HomepageCard;
