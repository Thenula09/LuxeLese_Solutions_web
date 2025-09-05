import React from 'react';
import './About.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';
import about3 from '../../assets/about3.jpg';
import about4 from '../../assets/about4.jpg';

const About = () => {
  return (
    <>
      <div className="navbarA">
        <Navbar />
      </div>
      <div className="about-container">
        <h1>About Us</h1>
        <p className='topic1'>LuxeLese Solutions was born from a passion for cars and a commitment to exceptional service. With over five years of experience in the industry, our journey began with a simple goal: to make luxury and convenience accessible to everyone. We believe that every journey, big or small, deserves to be special. From weddings to travel, our mission is to provide you with the perfect ride and a truly memorable experience.</p>
        
        <img src={about1}  className="about-image" />
         <img src={about2}  className="about-image" />
         <img src={about3}  className="about-image" />

        <h2 className='ourmission'>Our Mission</h2>
        <p className='topic1'>Your Perfect Journey At LuxeLese Solutions, we're not just about renting cars; we're about delivering freedom and style. Our mission is to provide a seamless and trustworthy car rental experience for every occasion. Whether you need a vehicle for a wedding, a pre-shoot, a home-coming, or just for travel, we're dedicated to helping you find the perfect match. We're committed to making your special moments even more perfect.</p>

        <div className="card-container">
            
          <div className='card card1'>
            <h2 className='ourmission'> Why Choose Us?</h2>
            <p className='topic1'>Choosing the right car rental service is crucial. We stand out for our reliability, responsibility, and commitment to providing a fair price. Our fleet is meticulously maintained to ensure your safety and comfort, and our team is dedicated to handling every detail with the utmost care. We take pride in our work and guarantee a hassle-free experience from start to finish.</p>
          </div>
          <img src={about4}  className="about-image1" />
          <div className='card card2'>
            <h2>Our Mission</h2>
          </div>
          <div className='card card3'>
            <h2>Our Vision</h2>
          </div>
          <div className='card card4'>
            <h2>Our Values</h2>
          </div>
        </div>
        
        <p>We are committed to providing our customers with the best possible experience. We offer a wide range of vehicles to choose from, and our friendly and knowledgeable staff is always here to help.</p>
      </div>
      <div className="fotterA">
        <Footer />
      </div>
    </>
  );
};

export default About;