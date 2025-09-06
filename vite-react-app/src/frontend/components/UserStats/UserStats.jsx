import React from 'react';
import './UserStats.css';

const statsData = [
  {
    id: 1,
    value: '20+',
    label: 'Vehicle Types',
  },
  {
    id: 2,
    value: '400+',
    label: 'Active Users',
  },
  {
    id: 3,
    value: '50+',
    label: 'Monthly Orders',
  },
];

const UserStats = () => {
  return (
    <section className="user-stats-section">
      <h2 className="user-stats-title" data-aos="fade-down">Our Achievements</h2>
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-card" key={stat.id} data-aos="zoom-in" data-aos-delay={index * 150}>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserStats;
