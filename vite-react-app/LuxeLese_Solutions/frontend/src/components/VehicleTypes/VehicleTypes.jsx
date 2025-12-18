import React, { useState } from 'react';
import './VehicleTypes.css';
import { FaCar, FaTruck, FaCarSide, FaMotorcycle, FaBus, FaTaxi } from 'react-icons/fa';

const VehicleTypes = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const vehicleCategories = [
    { 
      icon: <FaCar />, 
      name: 'Sedan', 
      count: '15+ Cars',
      brands: ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Audi']
    },
    { 
      icon: <FaCarSide />, 
      name: 'SUV', 
      count: '10+ Cars',
      brands: ['Land Rover', 'BMW', 'Mercedes-Benz', 'Porsche', 'Audi']
    },
    { 
      icon: <FaTruck />, 
      name: 'Luxury', 
      count: '8+ Cars',
      brands: ['Rolls-Royce', 'Bentley', 'Maybach', 'Porsche', 'Maserati']
    },
    { 
      icon: <FaMotorcycle />, 
      name: 'Sports', 
      count: '5+ Cars',
      brands: ['Ferrari', 'Lamborghini', 'McLaren', 'Porsche', 'Bugatti']
    },
    { 
      icon: <FaBus />, 
      name: 'Electric', 
      count: '7+ Cars',
      brands: ['Tesla', 'Porsche', 'Audi e-tron', 'BMW i', 'Mercedes-EQ']
    },
   
  ];

  return (
    <div className="vehicle-types-section">
      <h2 className="section-title">Our Vehicle Types</h2>
      <p className="section-description">Choose from our wide range of premium vehicles</p>
      
      <div className="vehicle-types-container">
        {vehicleCategories.map((category, index) => (
          <div 
            key={index} 
            className="vehicle-type-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="icon-container">
              {category.icon}
            </div>
            <h3>{category.name}</h3>
            <p>{category.count}</p>
            
            {hoveredCard === index && (
              <div className="brands-popup">
                <h4>Available Brands</h4>
                <ul>
                  {category.brands.map((brand, brandIndex) => (
                    <li key={brandIndex}>{brand}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypes;