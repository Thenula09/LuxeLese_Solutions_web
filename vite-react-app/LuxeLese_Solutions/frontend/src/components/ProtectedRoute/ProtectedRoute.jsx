import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';

/**
 * Protected Route Component
 * Redirects to signin if not authenticated
 * Can also check for admin role
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
