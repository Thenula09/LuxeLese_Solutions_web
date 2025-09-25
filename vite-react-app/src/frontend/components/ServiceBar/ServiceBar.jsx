import React from 'react';
import { FaCar, FaRing, FaHandshake, FaCamera } from 'react-icons/fa';
import './ServiceBar.css';

const ServiceBar = () => {
  const services = [
    {
      icon: <FaCar />,
      title: 'Rent',
      description: 'Premium car rental services'
    },
    {
      icon: <FaRing />,
      title: 'Wedding',
      description: 'Luxury wedding car services'
    },
    {
      icon: <FaHandshake />,
      title: 'Hire',
      description: 'Long-term vehicle hire services'
    },
    {
      icon: <FaCamera />,
      title: 'Photoshoot',
      description: 'Professional photo sessions'
    }
  ];

  return (
    <div className="service-bar">
      <div className="service-container">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-item"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="service-icon">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBar;