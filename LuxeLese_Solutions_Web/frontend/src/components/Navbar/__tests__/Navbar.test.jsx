import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import Navbar from '../Navbar';
import { setAuthData } from '../../../utils/auth';

// Mock useNavigate from react-router-dom to inspect navigation calls
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>
  };
});

beforeEach(() => {
  localStorage.clear();
  mockNavigate.mockReset();
});

describe('Navbar component', () => {
  it('shows Sign In when no user', () => {
    render(<Navbar />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('shows user name and My Bookings when logged in', () => {
    setAuthData('t', { name: 'Alice', email: 'a@example.com', role: 'user' });
    render(<Navbar />);
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
  });

  it('toggles dropdown and logout triggers navigation', () => {
    setAuthData('t', { name: 'Bob', email: 'b@example.com', role: 'user' });
    render(<Navbar />);
    const profileButton = screen.getByText(/Bob/i);
    fireEvent.click(profileButton);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);
    // Expect navigate called to /loading
    expect(mockNavigate).toHaveBeenCalled();
    const [path, options] = mockNavigate.mock.calls[0];
    expect(path).toBe('/loading');
    expect(options.state.redirectTo).toBe('/signin');
  });
});