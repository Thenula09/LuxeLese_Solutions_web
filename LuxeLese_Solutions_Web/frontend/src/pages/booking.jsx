import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './booking.css';
import DotGridBackground from '../components/DotGridBackground';
import Footer from '../components/Footer/footer';
import { FaStar, FaCarSide, FaClock, FaUsers, FaSearch, FaTh, FaList } from 'react-icons/fa';
import { isAuthenticated, getCurrentUser, onAuthStateChange } from '../utils/auth';

const Booking = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCars, setTotalCars] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Listen for auth changes to update user state
  useEffect(() => {
    const cleanup = onAuthStateChange(() => {
      setUser(getCurrentUser());
    });

    return cleanup;
  }, []);

  // Fallback data if API fails or no data
  const fallbackCars = [
    {
      _id: 'fallback-1',
      name: "BMW X5",
      model: "Luxury SUV",
      rating: 4.8,
      users: 150,
      category: "Luxury SUV",
      pricePerDay: 150,
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month",
      features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
    },
    {
      _id: 'fallback-2',
      name: "Mercedes C-Class",
      model: "Premium Sedan",
      rating: 4.9,
      users: 180,
      category: "Premium Sedan",
      pricePerDay: 120,
      image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month",
      features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
    },
    {
      _id: 'fallback-3',
      name: "Toyota Land Cruiser",
      model: "Premium SUV",
      rating: 4.7,
      users: 120,
      category: "Premium SUV",
      pricePerDay: 180,
      image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month",
      features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
    },
    {
      _id: 'fallback-4',
      name: "Audi A6",
      model: "Luxury Sedan",
      rating: 4.6,
      users: 130,
      category: "Luxury Sedan",
      pricePerDay: 140,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month",
      features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
    },
    {
      _id: 'fallback-5',
      name: "Range Rover Sport",
      model: "Premium SUV",
      rating: 4.9,
      users: 200,
      category: "Premium SUV",
      pricePerDay: 200,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80",
      type: "SUV",
      timeFrame: "Day/Week/Month",
      features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
    },
    {
      _id: 'fallback-6',
      name: "Tesla Model S",
      model: "Electric Sedan",
      rating: 4.8,
      users: 175,
      category: "Electric Sedan",
      pricePerDay: 160,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80",
      type: "Sedan",
      timeFrame: "Day/Week/Month",
      features: ['Electric', 'Autopilot', 'GPS', 'Premium Audio']
    }
  ];

  // Function to get image based on brand/category
  const getCarImage = (car) => {
    if (car.image) return car.image;
    
    // Default images based on brand or category
    const brandImages = {
      'Toyota': 'https://images.unsplash.com/photo-1623909794321-386106839f17?auto=format&fit=crop&w=400&q=80',
      'BMW': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
      'Mercedes': 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
      'Audi': 'https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=400&q=80',
      'Ford': 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=400&q=80',
      'Range Rover': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80',
      'Lamborghini': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&q=80',
      'Suzuki': 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=400&q=80'
    };

    const categoryImages = {
      'SUV': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80',
      'Sedan': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
      'Sports': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80',
      'Luxury': 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=400&q=80'
    };

    // Try to match by brand
    if (car.brand && brandImages[car.brand]) {
      return brandImages[car.brand];
    }

    // Try to match by category
    if (car.category && categoryImages[car.category]) {
      return categoryImages[car.category];
    }

    // Default car image
    return 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80';
  };

  // Fetch cars from API with pagination (or all vehicles with limit=0)
  const fetchCars = async (pageNum = 1, append = false) => {
    const startTime = performance.now();
    
    if (append) setLoadingMore(true);
    
    try {
      const response = await fetch(`/api/cars?page=${pageNum}&limit=0`, {
        headers: {
          'Accept-Encoding': 'gzip, deflate'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const loadTime = performance.now() - startTime;
        const cacheStatus = data.cached ? '(cached)' : '';
        console.log(`✅ Cars loaded in ${loadTime.toFixed(0)}ms ${cacheStatus}`);
        
        if (data.success && data.data.length > 0) {
          if (append) {
            setCars(prev => [...prev, ...data.data]);
          } else {
            setCars(data.data);
            // Extract unique categories - optimized
            const categorySet = new Set(['All']);
            data.data.forEach(car => car.category && categorySet.add(car.category));
            setCategories([...categorySet]);
          }
          
          setTotalCars(data.total);
          setHasMore(false); // all cars mode, no pagination required
          setPage(pageNum);
        } else if (!append) {
          setCars(fallbackCars);
          setCategories(['All', ...new Set(fallbackCars.map(car => car.category).filter(Boolean))]);
        }
      } else if (!append) {
        setCars(fallbackCars);
        setCategories(['All', ...new Set(fallbackCars.map(car => car.category).filter(Boolean))]);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      if (!append) {
        setCars(fallbackCars);
        setCategories(['All', ...new Set(fallbackCars.map(car => car.category).filter(Boolean))]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCars(1, false);
  }, []);

  // Load more function
  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchCars(page + 1, true);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           car.type === selectedCategory ||
                           car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <DotGridBackground>
        <div className="booking-container">
          <h1 className="booking-title">Booking</h1>
          
          <div className="booking-main-content">
            {/* Search Bar */}
            <div className="search-section glass-section">
              <div className="search-bar glass-input">
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
            {loading ? (
              <div className="loading">
                <p>Loading cars...</p>
              </div>
            ) : filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div 
                key={car._id || index} 
                className={`car-card ${viewMode} ${selectedCar === index ? 'selected' : ''}`}
                onClick={() => setSelectedCar(index)}
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="car-image" 
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80';
                  }}
                />
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
                    <span className="car-price">${car.pricePerDay}/day</span>
                    <button 
                      className="book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/placeorder', { 
                          state: { 
                            vehicle: car // pass full car object including _id
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

        {/* Load More Button */}
        {!loading && hasMore && filteredCars.length > 0 && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <button 
              className="book-btn" 
              onClick={loadMore}
              disabled={loadingMore}
              style={{ 
                padding: '12px 40px',
                fontSize: '16px',
                cursor: loadingMore ? 'not-allowed' : 'pointer',
                opacity: loadingMore ? 0.6 : 1
              }}
            >
              {loadingMore ? 'Loading...' : `Load More (${totalCars - cars.length} remaining)`}
            </button>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div style={{ textAlign: 'center', color: '#fff', margin: '20px 0', fontSize: '14px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Showing {filteredCars.length} of {totalCars} cars
            {filteredCars.length !== cars.length && ` (${cars.length} loaded)`}
          </div>
        )}
        
        </div>
      </div>
      </DotGridBackground>
      
      <div className='footerA'>
        <Footer />
      </div>
    </>
  );
};

export default Booking;