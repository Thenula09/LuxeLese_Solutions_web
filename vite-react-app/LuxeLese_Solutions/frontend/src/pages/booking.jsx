import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './booking.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';
import { FaStar, FaCarSide, FaClock, FaUsers, FaSearch, FaTh, FaList } from 'react-icons/fa';

const Booking = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCar, setSelectedCar] = useState(null);

  const availableCars = [
    {
      name: "BMW X5",
      rating: 4.8,
      users: 150,
      category: "Luxury SUV",
      price: "$150/day",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Mercedes C-Class",
      rating: 4.9,
      users: 180,
      category: "Premium Sedan",
      price: "$120/day",
      image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Toyota Land Cruiser",
      rating: 4.7,
      users: 120,
      category: "Premium SUV",
      price: "$180/day",
      image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Audi A6",
      rating: 4.6,
      users: 130,
      category: "Luxury Sedan",
      price: "$140/day",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Range Rover Sport",
      rating: 4.9,
      users: 200,
      category: "Premium SUV",
      price: "$200/day",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Tesla Model S",
      rating: 4.8,
      users: 175,
      category: "Electric Sedan",
      price: "$160/day",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month"
    }
  ];

  const categories = ['All', 'SUV', 'Sedan', 'Luxury SUV', 'Premium Sedan'];

  const filteredCars = availableCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           car.type === selectedCategory ||
                           car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <button onClick={() => navigate('/')} className="auth-back-btn">
          &larr; Back to Home
        </button>
        <h1 className="booking-itle">Book Your Perfect Ride</h1>
        
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by car name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FaTh />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Cars Grid/List */}
        <div className={`cars-container ${viewMode}`}>
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div 
                key={index} 
                className={`car-card ${viewMode} ${selectedCar === index ? 'selected' : ''}`}
                onClick={() => setSelectedCar(index)}
              >
                <img src={car.image} alt={car.name} className="car-image" />
                <div className="car-content">
                  <div className="car-header">
                    <h3>{car.name}</h3>
                    <div className="rating">
                      <FaStar className="star-icon" />
                      <span>{car.rating}</span>
                    </div>
                  </div>
                  
                  <div className="car-details">
                    <div className="detail-item">
                      <FaCarSide />
                      <span>{car.category}</span>
                    </div>
                    <div className="detail-item">
                      <FaUsers />
                      <span>{car.users} bookings</span>
                    </div>
                    <div className="detail-item">
                      <FaClock />
                      <span>{car.timeFrame}</span>
                    </div>
                  </div>

                  <div className="car-footer">
                    <span className="car-price">{car.price}</span>
                    <button 
                      className="book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/placeorder', { 
                          state: { 
                            vehicle: {
                              name: car.name,
                              model: car.category,
                              image: car.image,
                              pricePerDay: parseInt(car.price.replace('$', '').replace('/day', '')),
                              features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
                              rating: car.rating,
                              users: car.users
                            }
                          } 
                        });
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No cars found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className='footerA'>
        <Footer />
      </div>
    </>
  );
};

export default Booking;