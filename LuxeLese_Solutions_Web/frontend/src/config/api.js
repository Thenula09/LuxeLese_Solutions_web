// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  RESET_PASSWORD_TOKEN: (token) => `${API_BASE_URL}/api/auth/reset-password/${token}`,
  
  // Car endpoints
  CARS: `${API_BASE_URL}/api/cars`,
  CAR_BY_ID: (id) => `${API_BASE_URL}/api/cars/${id}`,
  CAR_SEARCH: `${API_BASE_URL}/api/cars/search`,
  
  // Booking endpoints
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
  BOOKED_DATES: (carId) => `${API_BASE_URL}/api/bookings/booked-dates/${carId}`,
  
  // Payment endpoints
  CREATE_PAYMENT_INTENT: `${API_BASE_URL}/api/payments/create-payment-intent`,
  CONFIRM_PAYMENT: `${API_BASE_URL}/api/payments/confirm-payment`,
};

export default API_BASE_URL;
