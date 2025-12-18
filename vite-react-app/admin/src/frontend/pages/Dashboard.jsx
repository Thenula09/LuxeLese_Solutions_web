import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';

function Dashboard() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default Dashboard;
