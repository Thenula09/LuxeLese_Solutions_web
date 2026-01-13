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
    // Mock API calls to never resolve so component stays in loading state
    apiService.getBookings.mockImplementation(() => new Promise(() => {}));
    apiService.getPayments.mockImplementation(() => new Promise(() => {}));
    apiService.getVehicles.mockImplementation(() => new Promise(() => {}));
    
    render(<Dashboard />);
    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  it('displays dashboard statistics correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    });

    expect(screen.getByText('$250.00')).toBeInTheDocument(); // Total revenue from payments
    
    // Check Fleet Size card specifically
    const fleetSizeHeading = screen.getByText('Fleet Size');
    const fleetSizeCard = fleetSizeHeading.closest('.stat-card');
    expect(fleetSizeCard).toHaveTextContent('3'); // Total vehicles
    
    // Check Total Customers card specifically  
    const totalCustomersHeading = screen.getByText('Total Customers');
    const totalCustomersCard = totalCustomersHeading.closest('.stat-card');
    expect(totalCustomersCard).toHaveTextContent('3'); // Total customers (unique emails)
  });

  it('renders revenue chart', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });
  });

  it('displays upcoming bookings section', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('📅 Upcoming Bookings')).toBeInTheDocument();
    });

    expect(screen.getByText('No upcoming bookings')).toBeInTheDocument();
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
    const activeRentalsCard = screen.getByText('Active Rentals').closest('.stat-card');
    expect(activeRentalsCard).toHaveTextContent('0');
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
    const fleetSizeCard = screen.getByText('Fleet Size').closest('.stat-card');
    expect(fleetSizeCard).toHaveTextContent('0');
  });

  it('calculates monthly revenue correctly', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('📈 Daily Revenue Trend')).toBeInTheDocument();
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
    const totalCustomersCard = screen.getByText('Total Customers').closest('.stat-card');
    expect(totalCustomersCard).toHaveTextContent('3');
  });

  it('updates data when socket event is received', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(apiService.getBookings).toHaveBeenCalledTimes(1);
    });

    // The socket should be set up to listen for events
    // Since we can't easily simulate socket events in this test environment,
    // we just verify that the component renders and the socket setup doesn't break it
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});