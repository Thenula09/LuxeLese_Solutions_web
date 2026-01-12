import React from 'react';
import { FaCar, FaRing, FaHandshake, FaCamera } from 'react-icons/fa';
import './ServiceBar.css';
import weddingVideo from '../../../assets/wedding.mp4';
import rentVideo from '../../assets/rent.mp4';
import hireVideo from '../../assets/hire.mp4';
import photoshootVideo from '../../assets/photoshoot.mp4';

const ServiceBar = () => {
  const services = [
    {
      icon: <FaCar />,
      title: 'Rent',
      description: 'Premium car rental services',
      video: rentVideo
    },
    {
      icon: <FaRing />,
      title: 'Wedding',
      description: 'Luxury wedding car services',
      video: weddingVideo
    },
    {
      icon: <FaHandshake />,
      title: 'Hire',
      description: 'Long-term vehicle hire services',
      video: hireVideo
    },
    {
      icon: <FaCamera />,
      title: 'Photoshoot',
      description: 'Professional photo sessions',
      video: photoshootVideo
    }
  ];

  return (
    <div className="service-bar">
      <div className="service-container">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`service-item service-card-${service.title.toLowerCase()}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Add video background to all cards */}
            {service.video && (
              <>
                <video 
                  className="service-video-bg"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={service.video} type="video/mp4" />
                </video>
                <div className="service-video-overlay"></div>
              </>
            )}
            
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