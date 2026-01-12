import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import Footer from '../components/Footer/footer';
import { FaUser, FaCamera, FaEdit, FaEye, FaCalendarAlt, FaCar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: ''
  });  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  const [bookingReview, setBookingReview] = useState(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchUserBookings();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.get('http://localhost:5002/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.data);
        setEditForm({
          name: response.data.data.name || '',
          phone: response.data.data.phone || '',
          address: response.data.data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      console.log('Fetching bookings...');
      const response = await axios.get('http://localhost:5002/api/profile/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Bookings response:', response.data);
      if (response.data.success) {
        setBookings(response.data.data);
        console.log('Bookings loaded:', response.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      console.error('Error response:', error.response?.data);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5002/api/profile', editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post('http://localhost:5002/api/profile/upload-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setUser(response.data.data.user);
        alert('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewBookingDetails = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5002/api/profile/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSelectedBooking(response.data.data);
        setActiveTab('booking-details');
        
        // Fetch review if exists
        fetchBookingReview(bookingId);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
      alert('Failed to load booking details.');
    }
  };

  const fetchBookingReview = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5002/api/reviews/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success && response.data.data) {
        setBookingReview(response.data.data);
        setReviewForm({
          rating: response.data.data.rating,
          comment: response.data.data.comment
        });
      } else {
        setBookingReview(null);
        setReviewForm({
          rating: 5,
          comment: ''
        });
      }
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5002/api/reviews', {
        bookingId: selectedBooking._id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        alert('Review submitted successfully!');
        fetchBookingReview(selectedBooking._id);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information and view your bookings</p>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt /> My Bookings ({bookings.length})
          </button>
          {selectedBooking && (
            <button
              className={`tab-button ${activeTab === 'booking-details' ? 'active' : ''}`}
              onClick={() => setActiveTab('booking-details')}
            >
              <FaEye /> Booking Details
            </button>
          )}
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  {user?.profilePicture ? (
                    <img
                      src={`http://localhost:5002${user.profilePicture}`}
                      alt="Profile"
                      className="profile-picture"
                    />
                  ) : (
                    <div className="profile-picture-placeholder">
                      <FaUser size={50} />
                    </div>
                  )}
                  <button
                    className="upload-button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <FaCamera />
                    {isUploading ? 'Uploading...' : 'Change Photo'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              <div className="profile-info-section">
                {!isEditing ? (
                  <div className="profile-info">
                    <div className="info-item">
                      <FaUser className="info-icon" />
                      <div>
                        <label>Name</label>
                        <p>{user?.name}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <FaEnvelope className="info-icon" />
                      <div>
                        <label>Email</label>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <FaPhone className="info-icon" />
                      <div>
                        <label>Phone</label>
                        <p>{user?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <FaMapMarkerAlt className="info-icon" />
                      <div>
                        <label>Address</label>
                        <p>{user?.address || 'Not provided'}</p>
                      </div>
                    </div>
                    <button
                      className="edit-button"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  </div>
                ) : (
                  <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        rows="3"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-button">Save Changes</button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            name: user?.name || '',
                            phone: user?.phone || '',
                            address: user?.address || ''
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>Your Bookings</h2>
              {bookings.length === 0 ? (
                <div className="no-bookings">
                  <FaCalendarAlt size={50} />
                  <p>You haven't made any bookings yet.</p>
                  <button
                    className="book-now-button"
                    onClick={() => navigate('/booking')}
                  >
                    Book a Car Now
                  </button>
                </div>
              ) : (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                      <div className="booking-card-image">
                        {booking.carImage ? (
                          <img src={booking.carImage} alt={booking.carName} />
                        ) : booking.carId?.image ? (
                          <img src={booking.carId.image} alt={booking.carName} />
                        ) : (
                          <div className="booking-card-placeholder">
                            <FaCar size={40} />
                          </div>
                        )}
                      </div>
                      <div className="booking-card-content">
                        <div className="booking-header">
                          <div className="car-info">
                            <div>
                              <h3>{booking.carName}</h3>
                              <p className="booking-id">ID: {booking._id.slice(-8).toUpperCase()}</p>
                              <div className="booking-status-row">
                                <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                                  {booking.status || 'Pending'}
                                </span>
                                <span className={`payment-badge ${booking.paymentStatus?.toLowerCase() || 'pending'}`}>
                                  Payment: {booking.paymentStatus || 'Pending'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking-dates">
                          <div className="date-item">
                            <label>From</label>
                            <p>{formatDate(booking.startDate || booking.selectedDates[0])}</p>
                          </div>
                          <div className="date-item">
                            <label>To</label>
                            <p>{formatDate(booking.endDate || booking.selectedDates[booking.selectedDates.length - 1])}</p>
                          </div>
                          <div className="date-item">
                            <label>Days</label>
                            <p>{booking.numberOfDays || booking.selectedDates.length}</p>
                          </div>
                        </div>
                        {booking.totalCost && (
                          <div className="booking-cost">
                            <label>Total Cost:</label>
                            <p className="cost-amount">${booking.totalCost}</p>
                          </div>
                        )}
                        {booking.payment && (
                          <div className="payment-info">
                            <label>Payment:</label>
                            <p>${booking.payment.amount} - {booking.payment.status}</p>
                          </div>
                        )}
                        <button
                          className="view-details-button"
                          onClick={() => handleViewBookingDetails(booking._id)}
                        >
                          <FaEye /> View Details & Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'booking-details' && selectedBooking && (
            <div className="booking-details-section">
              <button 
                className="back-button"
                onClick={() => setActiveTab('bookings')}
              >
                ← Back to Bookings
              </button>
              <h2>Booking Details</h2>
              <div className="booking-details-card">
                <div className="details-header">
                  <div className="car-summary">
                    <h3>{selectedBooking.carName}</h3>
                    {selectedBooking.carId?.brand && (
                      <p className="car-brand">{selectedBooking.carId.brand} {selectedBooking.carId.model}</p>
                    )}
                    <p className="booking-id">Booking ID: {selectedBooking._id}</p>
                    <p className="booking-date">
                      Booked on: {formatDate(selectedBooking.createdAt)}
                    </p>
                    <div className="status-badges">
                      <span className={`status-badge ${selectedBooking.status?.toLowerCase() || 'pending'}`}>
                        {selectedBooking.status || 'Pending'}
                      </span>
                      <span className={`payment-badge ${selectedBooking.paymentStatus?.toLowerCase() || 'pending'}`}>
                        {selectedBooking.paymentStatus === 'paid' ? '✓ Paid' : 'Payment Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="details-grid">
                  <div className="detail-section">
                    <h4>Booking Information</h4>
                    <div className="detail-item">
                      <label>Full Name:</label>
                      <p>{selectedBooking.fullName}</p>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <p>{selectedBooking.email}</p>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <p>{selectedBooking.phoneNumber}</p>
                    </div>
                    {selectedBooking.whatsappNumber && (
                      <div className="detail-item">
                        <label>WhatsApp:</label>
                        <p>{selectedBooking.whatsappNumber}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <h4>Rental Period</h4>
                    <div className="detail-item">
                      <label>From:</label>
                      <p>{formatDate(selectedBooking.startDate || selectedBooking.selectedDates[0])}</p>
                    </div>
                    <div className="detail-item">
                      <label>To:</label>
                      <p>{formatDate(selectedBooking.endDate || selectedBooking.selectedDates[selectedBooking.selectedDates.length - 1])}</p>
                    </div>
                    <div className="detail-item">
                      <label>Duration:</label>
                      <p>{selectedBooking.numberOfDays || selectedBooking.selectedDates.length} day(s)</p>
                    </div>
                    {selectedBooking.totalCost && (
                      <div className="detail-item total-cost">
                        <label>Total Cost:</label>
                        <p className="cost-highlight">${selectedBooking.totalCost}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <h4>Additional Information</h4>
                    <div className="detail-item">
                      <label>Address:</label>
                      <p>{selectedBooking.address}</p>
                    </div>
                    {selectedBooking.additionalNote && (
                      <div className="detail-item">
                        <label>Special Notes:</label>
                        <p>{selectedBooking.additionalNote}</p>
                      </div>
                    )}
                  </div>

                  {selectedBooking.payment && (
                    <div className="detail-section payment-section">
                      <h4>Payment Details</h4>
                      <div className="detail-item">
                        <label>Amount Paid:</label>
                        <p className="payment-amount">${selectedBooking.payment.amount}</p>
                      </div>
                      <div className="detail-item">
                        <label>Payment Status:</label>
                        <span className={`status-badge ${selectedBooking.payment.status?.toLowerCase()}`}>
                          {selectedBooking.payment.status}
                        </span>
                      </div>
                      <div className="detail-item">
                        <label>Payment Date:</label>
                        <p>{formatDate(selectedBooking.payment.date)}</p>
                      </div>
                      {selectedBooking.payment.paymentIntentId && (
                        <div className="detail-item">
                          <label>Transaction ID:</label>
                          <p className="transaction-id">{selectedBooking.payment.paymentIntentId}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Review Section */}
                <div className="review-section">
                  <h3>Rate Your Experience</h3>
                  {bookingReview ? (
                    <div className="existing-review">
                      <div className="review-header">
                        <div className="review-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={star <= bookingReview.rating ? 'star-filled' : 'star-empty'}
                            />
                          ))}
                        </div>
                        <span className="review-date">
                          Reviewed on {formatDate(bookingReview.createdAt)}
                        </span>
                      </div>
                      <p className="review-comment">{bookingReview.comment}</p>
                    </div>
                  ) : (
                    <form className="review-form" onSubmit={handleSubmitReview}>
                      <div className="rating-input">
                        <label>Rating:</label>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={star <= reviewForm.rating ? 'star-filled star-clickable' : 'star-empty star-clickable'}
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="comment-input">
                        <label>Your Review:</label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          placeholder="Share your experience with this booking..."
                          rows="4"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="submit-review-btn"
                        disabled={isSubmittingReview}
                      >
                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='footerbara'>
        <Footer />
      </div>
    </>
  );
};

export default Profile;