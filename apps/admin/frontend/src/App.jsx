import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import IncomeAnalysis from './pages/IncomeAnalysis';
import { SocketProvider } from './context/SocketContext';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <SocketProvider>
            <Home />
          </SocketProvider>
        }>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="income-analysis" element={<IncomeAnalysis />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
