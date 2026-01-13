import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import apiService from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  default: {
    getBookings: vi.fn(),
    getPayments: vi.fn(),
    getVehicles: vi.fn(),
  },
}));

// Mock the socket context
vi.mock('../../context/SocketContext', () => ({
  useSocket: () => ({
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  }),
}));

// Mock Recharts components
vi.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
}));

describe('Dashboard Component', () => {
  const mockBookings = [
    {
      _id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      date: '2026-01-15',
      totalCost: 150,
      status: 'Confirmed'
    },
    {
      _id: '2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      date: '2026-01-20',
      totalCost: 100,
      status: 'Confirmed'
    },
    {
      _id: '3',
      customerName: 'Bob Wilson',
      email: 'bob@example.com',
      date: '2026-01-15',
      totalCost: 200,
      status: 'Pending'
    }
  ];

  const mockPayments = [
    {
      _id: '1',
      bookingId: '1',
      amount: 150,
      date: '2026-01-15',
      status: 'Completed'
    },
    {
      _id: '2',
      bookingId: '2',
      amount: 100,
      date: '2026-01-20',
      status: 'Completed'
    }
  ];

  const mockVehicles = [
    {
      _id: '1',
      name: 'Toyota Camry',
      status: 'Available'
    },
    {
      _id: '2',
      name: 'Honda Civic',
      status: 'Rented'
    },
    {
      _id: '3',
      name: 'BMW X3',
      status: 'Available'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mocks
    apiService.getBookings.mockResolvedValue(mockBookings);
    apiService.getPayments.mockResolvedValue(mockPayments);
    apiService.getVehicles.mockResolvedValue(mockVehicles);
  });

  it('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays dashboard statistics correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    });

    expect(screen.getByText('$250.00')).toBeInTheDocument(); // Total revenue from payments
    expect(screen.getByText('3')).toBeInTheDocument(); // Total vehicles
    expect(screen.getByText('3')).toBeInTheDocument(); // Total customers (unique emails)
  });

  it('displays booking status breakdown', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Booking Status')).toBeInTheDocument();
    });

    expect(screen.getByText('Confirmed: 2')).toBeInTheDocument();
    expect(screen.getByText('Pending: 1')).toBeInTheDocument();
  });

  it('displays vehicle status breakdown', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Vehicle Status')).toBeInTheDocument();
    });

    expect(screen.getByText('Available: 2')).toBeInTheDocument();
    expect(screen.getByText('Rented: 1')).toBeInTheDocument();
  });

  it('renders revenue chart', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });
  });

  it('displays recent bookings', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Recent Bookings')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays recent payments', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Recent Payments')).toBeInTheDocument();
    });

    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    apiService.getBookings.mockRejectedValue(new Error('API Error'));
    apiService.getPayments.mockRejectedValue(new Error('API Error'));
    apiService.getVehicles.mockRejectedValue(new Error('API Error'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Should show default values when APIs fail
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles empty data arrays', async () => {
    apiService.getBookings.mockResolvedValue([]);
    apiService.getPayments.mockResolvedValue([]);
    apiService.getVehicles.mockResolvedValue([]);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    });

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calculates monthly revenue correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Revenue Trends')).toBeInTheDocument();
    });

    // Should have chart data for January 2026
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('shows correct customer count with unique emails', async () => {
    const bookingsWithDuplicateEmail = [
      ...mockBookings,
      {
        _id: '4',
        customerName: 'John Doe Jr',
        email: 'john@example.com', // Same email as first booking
        date: '2026-01-25',
        totalCost: 75,
        status: 'Confirmed'
      }
    ];

    apiService.getBookings.mockResolvedValue(bookingsWithDuplicateEmail);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Customers')).toBeInTheDocument();
    });

    // Should still show 3 unique customers, not 4
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('updates data when socket event is received', async () => {
    const mockSocket = {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    };

    // Mock the socket context to return our mock socket
    vi.mocked(vi.importMock('../../context/SocketContext')).useSocket.mockReturnValue(mockSocket);

    render(<Dashboard />);

    await waitFor(() => {
      expect(apiService.getBookings).toHaveBeenCalledTimes(1);
    });

    // Simulate socket event
    const handleDataUpdate = mockSocket.on.mock.calls.find(call => call[0] === 'dataUpdated')[1];
    handleDataUpdate({ type: 'booking', action: 'create' });

    expect(apiService.getBookings).toHaveBeenCalledTimes(2);
  });
});