import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { setAuthData, logout } from '../../../utils/auth';

describe('ProtectedRoute', () => {
  it('does not render children when not authenticated', () => {
    logout();
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Secret')).toBeNull();
    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    setAuthData('token1', { name: 'User', role: 'user' });
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret Area</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Secret Area')).toBeInTheDocument();
  });

  it('blocks non-admin from adminOnly route', () => {
    setAuthData('token2', { name: 'User2', role: 'user' });
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <div>Admin Area</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Admin Area')).toBeNull();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('allows admin for adminOnly route', () => {
    setAuthData('token3', { name: 'Admin', role: 'admin' });
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <div>Admin Area</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Area')).toBeInTheDocument();
  });
});