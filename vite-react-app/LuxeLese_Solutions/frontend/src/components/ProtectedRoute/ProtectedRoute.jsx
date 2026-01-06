import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, onAuthStateChange } from '../../utils/auth';

/**
 * Protected Route Component
 * Redirects to signin if not authenticated
 * Can also check for admin role
 * Listens to auth state changes for real-time updates
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    // Listen for auth state changes
    const cleanup = onAuthStateChange(() => {
      setAuthenticated(isAuthenticated());
      setUser(getCurrentUser());
    });

    return cleanup;
  }, []);

  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
