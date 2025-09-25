import React from "react";
import './memorable_moments.css';
import { FaHeart, FaShare, FaComment } from 'react-icons/fa';
import about1 from '../../../assets/about1.jpg';
import about2 from '../../../assets/about2.jpg';
import about3 from '../../../assets/about3.jpg';
import about4 from '../../../assets/about4.jpg';

const moments = [
    {
        date: "2024-06-01",
        photo: about1,
        customer: "Alice Smith",
        description: "Perfect day with the perfect car! BMW M5 made our wedding spectacular.",
        likes: 234,
        comments: 15
    },
    {
        date: "2024-06-02",
        photo: about2,
        customer: "Bob Johnson",
        description: "Business trip in style with Mercedes S-Class.",
        likes: 189,
        comments: 12
    },
    {
        date: "2024-06-03",
        photo: about3,
        customer: "Charlie Lee",
        description: "Weekend getaway made better with this luxury SUV.",
        likes: 312,
        comments: 28
    },
    {
        date: "2024-06-04",
        photo: about4,
        customer: "Diana King",
        description: "Photo shoot with vintage collection was amazing!",
        likes: 276,
        comments: 22
    },
  {
        date: "2024-06-05",
        photo: about1,
        customer: "Ethan Brown",
        description: "An unforgettable experience driving the Audi R8.",
        likes: 198,
        comments: 18
    },
  {
        date: "2024-06-06",
        photo: about2,
        customer: "Fiona White",
        description: "Celebrated my anniversary in a Rolls-Royce Phantom. Truly magical!",
        likes: 254,
        comments: 20
    },
  


];

const MemorableMoments = () => {
    return (
        <div className="memorable-moments">
            <div className="memorable-header">
                <h2>Memorable Moments</h2>
                <p>Discover amazing experiences shared by our customers</p>
            </div>
            <div className="moments-grid">
                {moments.map((moment, idx) => (
                    <div 
                        className="moment-box" 
                        key={idx}
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                    >
                        <div className="moment-image-container">
                            <img src={moment.photo} alt={moment.customer} className="moment-photo" />
                            <div className="customer-tag">{moment.customer}</div>
                        </div>
                        <div className="moment-details">
                            <div className="moment-date">{moment.date}</div>
                            <p className="moment-description">{moment.description}</p>
                            <div className="moment-interactions">
                                <div className="interaction-item">
                                    <FaHeart className="interaction-icon heart" />
                                    <span>{moment.likes}</span>
                                </div>
                                <div className="interaction-item">
                                    <FaComment className="interaction-icon" />
                                    <span>{moment.comments}</span>
                                </div>
                                <div className="interaction-item">
                                    <FaShare className="interaction-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemorableMoments;