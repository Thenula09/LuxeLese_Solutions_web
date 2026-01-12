import React from 'react';
import './VehicleDetails.css';

const VehicleDetails = ({ vehicle }) => {
  const vehicleData = vehicle || {
    name: 'Luxury Sedan',
    model: '2024 Mercedes S-Class',
    image: '/assets/car-placeholder.jpg',
    pricePerDay: 150,
    rating: 4.8,
    users: 250,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth', 'Leather Seats', 'Sunroof']
  };

  return (
    <div className="vehicle-details-section">
      <div className="vehicle-details-card">
        <div className="vehicle-details-image">
          <img 
            src={vehicleData.image} 
            alt={vehicleData.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x250?text=Luxury+Vehicle';
            }}
          />
          <div className="vehicle-details-badge">Premium</div>
        </div>
        
        <div className="vehicle-details-info">
          <h2>Vehicle Summary</h2>
          <p className="vehicle-details-model">{vehicleData.name} - {vehicleData.model}</p>
          
          {vehicleData.rating && (
            <div className="vehicle-details-rating">
              <span className="rating-stars">⭐ {vehicleData.rating}</span>
              {vehicleData.users && <span className="rating-users">({vehicleData.users} bookings)</span>}
            </div>
          )}
          
          <div className="vehicle-details-price">
            <span className="price-label">Base Rate:</span>
            <span className="price-amount">${vehicleData.pricePerDay}/day</span>
          </div>
          
          <div className="vehicle-details-features">
            <h3>Key Features</h3>
            <ul>
              {vehicleData.features.map((feature, index) => (
                <li key={index}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
