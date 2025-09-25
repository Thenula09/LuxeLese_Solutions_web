import React, { useEffect, useState } from 'react';
import './WelcomeBox.css';
import img1 from '../../../assets/about1.jpg';
import img2 from '../../../assets/about2.jpg';
import img3 from '../../../assets/about3.jpg';
import img4 from '../../../assets/about4.jpg';

const WelcomeBox = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: img1, alt: "Luxury car 1" },
    { src: img2, alt: "Luxury car 2" },
    { src: img3, alt: "Luxury car 3" },
    { src: img4, alt: "Luxury car 4" }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 5000);

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentImage((current) => (current + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImage((current) => (current - 1 + images.length) % images.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="stage" aria-hidden="false">
      <div className="box" role="group" aria-label="Welcome image box">
        <div className="card">
          <div className="carousel">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={index === currentImage ? 'active' : ''}
              />
            ))}

            <div className="overlay">
              <h1>Welcome Aboard</h1>
              <p>Arrive in style — premium car hire</p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;