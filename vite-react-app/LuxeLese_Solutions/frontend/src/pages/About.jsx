import React, { useEffect } from 'react';
import './About.css';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/footer.jsx';
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';
import about3 from '../../assets/about3.jpg';
import about4 from '../../assets/about4.jpg';
import ReviewBox from '../components/ReviewBox/ReviewBox.jsx';
import UserStats from '../components/UserStats/UserStats.jsx';
import { FaCar, FaShieldAlt, FaDollarSign, FaStar, FaClock, FaHandshake } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    // AOS is loaded from a CDN and available globally
    if (window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
        easing: 'ease-out-cubic'
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* Story Section */}
        <section className="about-story" data-aos="fade-up">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <p className="story-text">
              LuxeLese Solutions was born from a passion for cars and a commitment to exceptional service. 
              With over five years of experience in the industry, our journey began with a simple goal: 
              to make luxury and convenience accessible to everyone. We believe that every journey, big or small, 
              deserves to be special. From weddings to travel, our mission is to provide you with the perfect ride 
              and a truly memorable experience.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="about-gallery">
          <div className="gallery-grid">
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="0">
              <img src={about1} alt="Luxury Car 1" />
              <div className="gallery-overlay">
                <span>Premium Fleet</span>
              </div>
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="200">
              <img src={about2} alt="Luxury Car 2" />
              <div className="gallery-overlay">
                <span>Exceptional Service</span>
              </div>
            </div>
            <div className="gallery-item" data-aos="zoom-in" data-aos-delay="400">
              <img src={about3} alt="Luxury Car 3" />
              <div className="gallery-overlay">
                <span>Memorable Moments</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-mission" data-aos="fade-right">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              At LuxeLese Solutions, we're not just about renting cars; we're about delivering freedom and style. 
              Our mission is to provide a seamless and trustworthy car rental experience for every occasion. 
              Whether you need a vehicle for a wedding, a pre-shoot, a home-coming, or just for travel, 
              we're dedicated to helping you find the perfect match. We're committed to making your special 
              moments even more perfect.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="about-features">
          <h2 className="section-title" data-aos="fade-down">Why Choose Us?</h2>
          
          <div className="features-grid">
            <div className="feature-card" data-aos="flip-left" data-aos-delay="0">
              <div className="feature-icon">
                <FaCar />
              </div>
              <h3>Premium Fleet</h3>
              <p>Our meticulously maintained fleet ensures your safety and comfort on every journey.</p>
            </div>

            <div className="feature-card" data-aos="flip-left" data-aos-delay="100">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Reliability</h3>
              <p>Drive with confidence knowing every vehicle is regularly serviced and inspected by professionals.</p>
            </div>

            <div className="feature-card" data-aos="flip-left" data-aos-delay="200">
              <div className="feature-icon">
                <FaDollarSign />
              </div>
              <h3>Fair Pricing</h3>
              <p>Transparent and competitive pricing designed to offer you the best value for your money.</p>
            </div>

            <div className="feature-card" data-aos="flip-left" data-aos-delay="300">
              <div className="feature-icon">
                <FaStar />
              </div>
              <h3>Excellence</h3>
              <p>We take pride in our work and guarantee a hassle-free experience from start to finish.</p>
            </div>

            <div className="feature-card" data-aos="flip-left" data-aos-delay="400">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>24/7 Support</h3>
              <p>Our dedicated team is always ready to assist you with any questions or concerns.</p>
            </div>

            <div className="feature-card" data-aos="flip-left" data-aos-delay="500">
              <div className="feature-icon">
                <FaHandshake />
              </div>
              <h3>Trust</h3>
              <p>Building lasting relationships through honesty, integrity, and exceptional service.</p>
            </div>
          </div>
        </section>

        {/* Commitment Section with Image */}
        <section className="about-commitment">
          <div className="commitment-grid" data-aos="fade-up">
            <div className="commitment-content">
              <h2 className="section-title">Our Commitment to Excellence</h2>
              <p className="commitment-text">
                When you rent from LuxeLese Solutions, you can drive with confidence. Our extensive fleet 
                of vehicles is regularly serviced and inspected by professionals to ensure they're in top condition. 
                We understand that reliability is key to a stress-free journey, and we work tirelessly to ensure 
                every car is ready for your special day. Your safety and peace of mind are our highest priorities.
              </p>
              <div className="commitment-points">
                <div className="point">
                  <span className="point-icon">✓</span>
                  <span>Regular professional maintenance</span>
                </div>
                <div className="point">
                  <span className="point-icon">✓</span>
                  <span>Comprehensive safety inspections</span>
                </div>
                <div className="point">
                  <span className="point-icon">✓</span>
                  <span>24/7 roadside assistance</span>
                </div>
                <div className="point">
                  <span className="point-icon">✓</span>
                  <span>Flexible rental terms</span>
                </div>
              </div>
            </div>
            <div className="commitment-image">
              <img src={about4} alt="Our Commitment" />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="about-reviews">
          <ReviewBox />
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <UserStats />
        </section>
      </div>

      {/* Footer */}
      <div className='footerbar'>
        <Footer />
      </div>
    </>
  );
};

export default About;