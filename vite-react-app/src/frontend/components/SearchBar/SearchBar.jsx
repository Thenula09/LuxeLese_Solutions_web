import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    carType: '',
    pickupDate: '',
    location: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search data:', searchData);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchData.carType}
            onChange={(e) => setSearchData({ ...searchData, carType: e.target.value })}
          />
        </div>

        <div className="search-input-group">
          <FaCalendar className="search-icon" />
          <input
            type="date"
            value={searchData.pickupDate}
            onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
          />
        </div>

        <div className="search-input-group">
          <FaMapMarkerAlt className="search-icon" />
          <input
            type="text"
            placeholder="Location"
            value={searchData.location}
            onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
          />
        </div>

        <button type="submit" className="search-button">
          Search Cars
        </button>
      </form>
    </div>
  );
};

export default SearchBar;