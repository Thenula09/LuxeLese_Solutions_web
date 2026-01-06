// Authentication utility functions

// Custom event for auth state changes (works in same tab)
const AUTH_CHANGE_EVENT = 'authStateChanged';

/**
 * Dispatch custom auth state change event
 */
const dispatchAuthChange = () => {
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
};

/**
 * Listen to auth state changes
 * @param {Function} callback
 * @returns {Function} cleanup function
 */
export const onAuthStateChange = (callback) => {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  // Also listen to storage events for other tabs
  window.addEventListener('storage', callback);
  
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get auth token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Set authentication data (call this after login)
 * @param {string} token
 * @param {Object} user
 */
export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  dispatchAuthChange(); // Notify all components
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatchAuthChange(); // Notify all components
  window.location.href = '/signin';
};

/**
 * Get auth headers for API requests
 * @returns {Object}
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

/**
 * Check if user is admin
 * @returns {boolean}
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
