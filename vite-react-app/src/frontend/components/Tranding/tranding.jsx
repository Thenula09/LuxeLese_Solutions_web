import React from "react";
import { FaStar, FaCarSide, FaClock, FaUsers } from "react-icons/fa";
import "./tranding.css";

function Tranding() {
  const trendingCars = [
    {
      name: "BMW X5",
      rating: 4.8,
      users: 150,
      category: "Luxury SUV",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Mercedes C-Class",
      rating: 4.9,
      users: 180,
      category: "Premium Sedan",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Toyota Land Cruiser",
      rating: 4.7,
      users: 120,
      category: "Premium SUV",
      timeFrame: "Day/Week/Month"
    },
    {
      name: "Audi A6",
      rating: 4.6,
      users: 130,
      category: "Luxury Sedan",
      timeFrame: "Day/Week/Month"
    },
    {
        name: "Audi A6",
        rating: 4.6,
        users: 130,
        category: "Luxury Sedan",
        timeFrame: "Day/Week/Month" 

    }
    ,{
        name: "Audi A6",
        rating: 4.6,
        users: 130,
        category: "Luxury Sedan",
        timeFrame: "Day/Week/Month" 
    }
    
    ];

// Add images and vehicle types to each car
const carImages = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80", // BMW X5
    "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80", // Mercedes C-Class
    "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80", // Toyota Land Cruiser
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", // Audi A6
];

const vehicleTypes = [
    "SUV",
    "Sedan",
    "SUV",
    "Sedan"
];

return (
    <div className="trending-section">
        <h2 className="trending-title" data-aos="fade-up">Trending Vehicles</h2>
        <div className="trending-container">
            {trendingCars.map((car, index) => (
                <div  
                    key={index} 
                    className="trending-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                >
                    <div className="trending-card-content">
                        <img 
                            src={carImages[index]} 
                            alt={car.name} 
                            className="car-photo"
                            style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
                        />
                        <div className="car-info">
                            <h3>{car.name}</h3>
                            <div className="rating">
                                <FaStar className="star-icon" />
                                <span>{car.rating}</span>
                            </div>
                            <div className="vehicle-type">
                                <strong>Type:</strong> {vehicleTypes[index]}
                            </div>
                        </div>
                        
                        <div className="car-details">
                            <div className="detail-item">
                             <FaCarSide />
                                <span>{car.category}</span>
                            </div>
                            <div className="detail-item">
                                <FaUsers />
                                <span>{car.users} users</span>
                            </div>
                            <div className="detail-item">
                                <FaClock />
                                <span>{car.timeFrame}</span>
                            </div>
                        </div>
                        
                        <button className="book-now-btn">Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Tranding;