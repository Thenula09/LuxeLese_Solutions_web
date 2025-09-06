import React from 'react';
import './ReviewBox.css';

const reviews = [
  {
    id: 1,
    author: 'S. Silva',
    rating: 5,
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder image
    content: 'Amazing experience! The car was clean, comfortable, and stylish. The booking process was incredibly easy and the staff were very professional. Highly recommended for any event!',
  },
  {
    id: 2,
    author: 'N. Fernando',
    rating: 5,
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg', // Placeholder image
    content: 'LuxeLese made our wedding day perfect. The car arrived on time, beautifully decorated, and the driver was so courteous. It was the touch of luxury we were looking for.',
  },
  {
    id: 3,
    author: 'R. Jayasuriya',
    rating: 4,
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg', // Placeholder image
    content: 'I rented a car for a weekend trip and was thoroughly impressed. The vehicle was in top condition and performed flawlessly. Fair pricing and excellent customer service.',
  },
  {
    id: 4,
    author: 'K. Bandara',
    rating: 5,
    profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg', // Placeholder image
    content: 'The best car rental service in town! They have a great selection of vehicles and the team is always ready to help. I wouldn\'t go anywhere else for my rental needs.',
  },
  {
    id: 5,
    author: 'D. Kumari',
    rating: 5,
    profilePhoto: 'https://randomuser.me/api/portraits/men/5.jpg', // Placeholder image
    content: 'From the pre-shoot to our homecoming, LuxeLese provided exceptional service. The cars are stunning and they truly care about making your moments special. Thank you!',
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const ReviewCard = ({ author, content, rating, profilePhoto, delay }) => (
  <div className="review-card" data-aos="fade-up" data-aos-delay={delay}>
    <div className="review-header">
      <img src={profilePhoto} alt={author} className="profile-photo" />
      <div className="author-info">
        <p className="review-card-author">{author}</p>
        <StarRating rating={rating} />
      </div>
    </div>
    <p className="review-card-content">"{content}"</p>
  </div>
);

const ReviewBox = () => {
  return (
    <div className="reviews-section">
      <h2 className="reviews-section-title" data-aos="fade-down">What Our Customers Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            content={review.content}
            rating={review.rating}
            profilePhoto={review.profilePhoto}
            delay={index * 100} // Stagger the animation
          />
        ))}
      </div>
      <div className="join-us-container" data-aos="fade-up" data-aos-delay="500">
        <button className="join-us-button">Join With Us</button>
      </div>
    </div>
  );
};

export default ReviewBox;
