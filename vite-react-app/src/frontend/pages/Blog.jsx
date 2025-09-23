import React from 'react';
import './Blog.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="blog-container">
        <h1 className="blog-title">Our Blog</h1>
        <div className="blog-grid">
          <article className="blog-card">
            <div className="blog-card-image"></div>
            <div className="blog-card-content">
              <h2>The Future of Electric Cars</h2>
              <p>Explore the latest trends in electric vehicles and how they're shaping the future of transportation...</p>
              <div className="blog-card-footer">
                <span className="blog-date">September 23, 2025</span>
                <button className="read-more">Read More</button>
              </div>
            </div>
          </article>

          <article className="blog-card">
            <div className="blog-card-image"></div>
            <div className="blog-card-content">
              <h2>Luxury Car Maintenance Tips</h2>
              <p>Essential maintenance tips to keep your luxury vehicle in pristine condition...</p>
              <div className="blog-card-footer">
                <span className="blog-date">September 20, 2025</span>
                <button className="read-more">Read More</button>
              </div>
            </div>
          </article>

          <article className="blog-card">
            <div className="blog-card-image"></div>
            <div className="blog-card-content">
              <h2>Wedding Transportation Guide</h2>
              <p>Everything you need to know about choosing the perfect wedding car...</p>
              <div className="blog-card-footer">
                <span className="blog-date">September 18, 2025</span>
                <button className="read-more">Read More</button>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;