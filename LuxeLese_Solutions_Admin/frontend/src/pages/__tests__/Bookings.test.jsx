import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Bookings from '../Bookings';
import apiService from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  default: {
    getBookings: vi.fn(),
    getPayments: vi.fn(),
    getVehicles: vi.fn(),
  },
}));

// Mock Recharts components
vi.mock('recharts', () => ({
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
}));

describe('Bookings Component', () => {
  const mockBookings = [
    {
      _id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      vehicle: 'Toyota Camry',
      date: '2026-01-15',
      duration: 3,
      totalCost: 150,
      status: 'Confirmed',
      notes: 'Test booking',
      selectedDates: ['2026-01-15']
    },
    {
      _id: '2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      vehicle: 'Honda Civic',
      date: '2026-01-20',
      duration: 2,
      totalCost: 100,
      status: 'Confirmed',
      notes: 'Another booking',
      selectedDates: ['2026-01-20']
    }
  ];

  const mockPayments = [
    {
      _id: '1',
      bookingId: '1',
      amount: 150,
      status: 'Completed'
    }
  ];

  const mockVehicles = [
    {
      _id: '1',
      name: 'Toyota Camry',
      brand: 'Toyota'
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
    render(<Bookings />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders bookings data after loading', async () => {
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('Honda Civic')).toBeInTheDocument();
  });

  it('displays payment amounts for bookings', async () => {
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('150.00')).toBeInTheDocument();
    });

    expect(screen.getByText('0.00')).toBeInTheDocument(); // For booking without payment
  });

  it('filters bookings by date', async () => {
    const user = userEvent.setup();
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const dateFilter = screen.getByLabelText('Filter by Date:');
    await user.type(dateFilter, '2026-01-15');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('filters bookings by vehicle', async () => {
    const user = userEvent.setup();
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const vehicleFilter = screen.getByLabelText('Filter by Vehicle:');
    await user.selectOptions(vehicleFilter, 'Toyota Camry');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('displays error message when API fails', async () => {
    apiService.getBookings.mockRejectedValue(new Error('API Error'));

    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch bookings')).toBeInTheDocument();
    });
  });

  it('renders chart component', async () => {
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });
  });

  it('shows correct booking count', async () => {
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('Total Bookings: 2')).toBeInTheDocument();
    });
  });

  it('calculates total revenue correctly', async () => {
    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('Total Revenue: $250.00')).toBeInTheDocument();
    });
  });

  it('handles empty bookings array', async () => {
    apiService.getBookings.mockResolvedValue([]);

    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('Total Bookings: 0')).toBeInTheDocument();
    });

    expect(screen.getByText('Total Revenue: $0.00')).toBeInTheDocument();
  });

  it('handles API errors gracefully for payments and vehicles', async () => {
    apiService.getPayments.mockRejectedValue(new Error('Payments API Error'));
    apiService.getVehicles.mockRejectedValue(new Error('Vehicles API Error'));

    render(<Bookings />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Component should still render even if payments/vehicles APIs fail
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
  });
});