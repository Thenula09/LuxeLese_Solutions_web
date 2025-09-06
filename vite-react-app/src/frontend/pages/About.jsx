import React, { useEffect } from 'react';
import './About.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';
import about3 from '../../assets/about3.jpg';
import about4 from '../../assets/about4.jpg';

const About = () => {
  useEffect(() => {
    // AOS is loaded from a CDN and available globally
    if (window.AOS) {
      window.AOS.init({
        duration: 1500, // Animation duration
        once: true, // Whether animation should happen only once - while scrolling down
      });
    }
  }, []);

  return (
    <>
      
      <div className="about-container">
        <div className="navbarA">
        <Navbar />
      </div>
        <h1 className='ourmission' data-aos="fade-down">About Us</h1>
        <p className='topic1' data-aos="fade-up">LuxeLese Solutions was born from a passion for cars and a commitment to exceptional service. With over five years of experience in the industry, our journey began with a simple goal: to make luxury and convenience accessible to everyone. We believe that every journey, big or small, deserves to be special. From weddings to travel, our mission is to provide you with the perfect ride and a truly memorable experience.</p>
        
        <div>
          <img src={about1}  className="about-image" data-aos="zoom-in" />
          <img src={about2}  className="about-image" data-aos="zoom-in" data-aos-delay="200" />
          <img src={about3}  className="about-image" data-aos="zoom-in" data-aos-delay="400" />
        </div>

        <h2 className='ourmission' data-aos="fade-down">Our Mission</h2>
        <p className='topic1' data-aos="fade-up">Your Perfect Journey At LuxeLese Solutions, we're not just about renting cars; we're about delivering freedom and style. Our mission is to provide a seamless and trustworthy car rental experience for every occasion. Whether you need a vehicle for a wedding, a pre-shoot, a home-coming, or just for travel, we're dedicated to helping you find the perfect match. We're committed to making your special moments even more perfect.</p>

        <div className="card-container">
            <div className="card-row">
                <div className='card card1' data-aos="fade-right">
                    <h2 className='ourmission'> Why Choose Us?</h2>
                    <p className='topic1'>Choosing the right car rental service is crucial. We stand out for our reliability, responsibility, and commitment to providing a fair price. Our fleet is meticulously maintained to ensure your safety and comfort, and our team is dedicated to handling every detail with the utmost care. We take pride in our work and guarantee a hassle-free experience from start to finish.</p>
                </div>
                <img src={about4}  className="about-image1" data-aos="fade-left" />
            </div>
            <div className="card-row">
                <div className='card card2' data-aos="flip-up">
                    <h2 className='ourmission'>Our Commitment to Reliability</h2>
                    <p className='topic1'>When you rent from LuxeLese Solutions, you can drive with confidence. Our extensive fleet of vehicles is regularly serviced and inspected by professionals to ensure they're in top condition. We understand that reliability is key to a stress-free journey, and we work tirelessly to ensure every car is ready for your special day. Your safety and peace of mind are our highest priorities.</p>
                </div>
            </div>
            <div className="card-row card-row-split">
                <div className='card card3' data-aos="zoom-in-up">
                    <h2 className='ourmission'>Fair Pricing for Unmatched Value</h2>
                     <p className='topic1'>We believe that luxury shouldn't come with a high price tag. Our pricing is transparent and competitive, designed to offer you the best value for your money. You can be confident that you're getting a high-quality vehicle and excellent service without overspending. We provide a luxury experience at a fair and affordable rate, because everyone deserves to travel in style.</p>

                </div>
                
            </div>

            
        </div>
        <div className="fotterA">
        <Footer />
      </div>
      </div>
      
    </>
  );
};

export default About;