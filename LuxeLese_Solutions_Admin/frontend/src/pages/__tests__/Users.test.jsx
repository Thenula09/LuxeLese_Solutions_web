import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Users from '../Users';
import apiService from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  default: {
    getBookings: vi.fn(),
  },
}));

describe('Users Component', () => {
  const mockBookings = [
    {
      _id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      date: '2026-01-15',
      createdAt: '2026-01-15T10:00:00Z'
    },
    {
      _id: '2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      date: '2026-01-20',
      createdAt: '2026-01-20T14:30:00Z'
    },
    {
      _id: '3',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      date: '2026-01-25',
      createdAt: '2026-01-25T16:45:00Z'
    },
    {
      _id: '4',
      customerName: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1122334455',
      date: '2026-02-01',
      createdAt: '2026-02-01T09:15:00Z'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    apiService.getBookings.mockResolvedValue(mockBookings);
  });

  it('renders loading state initially', () => {
    render(<Users />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders customer list after loading', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays unique customers with aggregated booking counts', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // John Doe should appear only once with 2 bookings
    const johnDoeElements = screen.getAllByText('John Doe');
    expect(johnDoeElements).toHaveLength(1);

    expect(screen.getByText('2')).toBeInTheDocument(); // Total bookings for John
    expect(screen.getByText('1')).toBeInTheDocument(); // Total bookings for Jane and Bob
  });

  it('displays customer contact information', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    expect(screen.getByText('+1234567890')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('+0987654321')).toBeInTheDocument();
  });

  it('searches customers by name', async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search customers...');
    await user.type(searchInput, 'Jane');

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Wilson')).not.toBeInTheDocument();
  });

  it('searches customers by email', async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search customers...');
    await user.type(searchInput, 'bob@example.com');

    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('searches customers by phone', async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search customers...');
    await user.type(searchInput, '+1122334455');

    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('shows total customer count', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Total Customers: 3')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    apiService.getBookings.mockRejectedValue(new Error('API Error'));

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch customers')).toBeInTheDocument();
    });
  });

  it('handles empty bookings array', async () => {
    apiService.getBookings.mockResolvedValue([]);

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Total Customers: 0')).toBeInTheDocument();
    });

    expect(screen.getByText('No customers found.')).toBeInTheDocument();
  });

  it('handles bookings with missing customer data', async () => {
    const bookingsWithMissingData = [
      {
        _id: '1',
        // Missing customerName, email, phone
        date: '2026-01-15'
      },
      {
        _id: '2',
        customerName: 'Valid Customer',
        email: 'valid@example.com',
        phone: '+1234567890',
        date: '2026-01-20'
      }
    ];

    apiService.getBookings.mockResolvedValue(bookingsWithMissingData);

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Valid Customer')).toBeInTheDocument();
    });

    expect(screen.getByText('Total Customers: 1')).toBeInTheDocument();
  });

  it('updates search results dynamically', async () => {
    const user = userEvent.setup();
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search customers...');

    // Search for John
    await user.type(searchInput, 'John');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();

    // Clear search
    await user.clear(searchInput);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays last booking date correctly', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // John Doe's last booking should be the most recent one (2026-01-25)
    // The component should show the most recent booking date
    expect(screen.getByText('2026-01-25')).toBeInTheDocument();
  });
});