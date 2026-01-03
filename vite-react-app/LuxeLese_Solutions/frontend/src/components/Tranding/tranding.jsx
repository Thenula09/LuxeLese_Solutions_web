import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaCarSide, FaClock, FaUsers } from "react-icons/fa";
import "./tranding.css";

function Tranding() {
  const navigate = useNavigate();
  const [trendingCars, setTrendingCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trending vehicles from API
  useEffect(() => {
    const fetchTrendingCars = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/cars?page=1&limit=6');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.length > 0) {
            setTrendingCars(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching trending cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCars();
  }, []);

  if (loading) {
    return (
      <div className="trending-section">
        <h2 className="trending-title" data-aos="fade-up">Trending Vehicles</h2>
        <div className="trending-container">
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading trending vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-section">
      <h2 className="trending-title" data-aos="fade-up">Trending Vehicles</h2>
      <div className="trending-container">
        {trendingCars.map((car, index) => (
          <div  
            key={car._id || index} 
            className="trending-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="trending-card-content">
              <img 
                src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80"} 
                alt={car.name} 
                className="car-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80';
                }}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
              />
              <div className="car-info">
                <h3>{car.name}</h3>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{car.rating}</span>
                </div>
                <div className="vehicle-type">
                  <strong>Type:</strong> {car.type || car.category}
                </div>
              </div>
              
              <div className="car-details">
                <div className="detail-item">
                  <FaCarSide />
                  <span>{car.category}</span>
                </div>
                <div className="detail-item">
                  <FaUsers />
                  <span>{car.users || 0} users</span>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <span>{car.timeFrame || 'Day/Week/Month'}</span>
                </div>
              </div>
              
              <button 
                className="book-now-btn" 
                onClick={() => navigate('/placeorder', { 
                  state: { 
                    vehicle: {
                      name: car.name,
                      model: car.category,
                      image: car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80",
                      pricePerDay: car.pricePerDay,
                      features: car.features || ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
                      rating: car.rating,
                      users: car.users || 0
                    }
                  } 
                })}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tranding;