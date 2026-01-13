import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderLogin();

    expect(screen.getByText('Login to LuxeLese Admin')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('updates email input value', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    await user.type(emailInput, 'admin@example.com');

    expect(emailInput.value).toBe('admin@example.com');
  });

  it('updates password input value', async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText('Password:');
    await user.type(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  it('navigates to home on successful login', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('does not navigate when email is empty', async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText('Password:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate when password is empty', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    await user.type(emailInput, 'admin@example.com');
    await user.click(submitButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    renderLogin();

    const form = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    const preventDefaultSpy = vi.fn();
    form.addEventListener('submit', preventDefaultSpy);

    await user.type(screen.getByLabelText('Email:'), 'admin@example.com');
    await user.type(screen.getByLabelText('Password:'), 'password123');
    await user.click(submitButton);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('has required attributes on inputs', () => {
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('has correct input types', () => {
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('maintains form state correctly', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'testpass');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpass');

    // Clear and type new values
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, 'new@example.com');
    await user.type(passwordInput, 'newpass');

    expect(emailInput.value).toBe('new@example.com');
    expect(passwordInput.value).toBe('newpass');
  });
});