import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Vehicles from '../Vehicles';
import apiService from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  default: {
    getVehicles: vi.fn(),
    addVehicle: vi.fn(),
    updateVehicle: vi.fn(),
    deleteVehicle: vi.fn(),
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

describe('Vehicles Component', () => {
  const mockVehicles = [
    {
      _id: '1',
      name: 'Toyota Camry',
      brand: 'Toyota',
      category: 'Sedan',
      licensePlate: 'ABC-123',
      pricePerDay: 50,
      securityDeposit: 200,
      status: 'Available',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seatingCapacity: 5,
      mileage: '15 km/l',
      mainImage: 'data:image/png;base64,test',
      description: 'A reliable sedan',
      features: ['AC', 'GPS']
    },
    {
      _id: '2',
      name: 'Honda Civic',
      brand: 'Honda',
      category: 'Sedan',
      licensePlate: 'XYZ-456',
      pricePerDay: 45,
      securityDeposit: 180,
      status: 'Rented',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seatingCapacity: 5,
      mileage: '16 km/l',
      mainImage: 'data:image/png;base64,test2',
      description: 'A sporty sedan',
      features: ['AC', 'Bluetooth']
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    apiService.getVehicles.mockResolvedValue(mockVehicles);
  });

  it('renders loading state initially', () => {
    render(<Vehicles />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders vehicles list after loading', async () => {
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    expect(screen.getByText('Honda Civic')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Rented')).toBeInTheDocument();
  });

  it('displays vehicle details correctly', async () => {
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota')).toBeInTheDocument();
    });

    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('ABC-123')).toBeInTheDocument();
    expect(screen.getByText('$50/day')).toBeInTheDocument();
  });

  it('opens add vehicle modal when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Vehicle');
    await user.click(addButton);

    expect(screen.getByText('Add New Vehicle')).toBeInTheDocument();
    expect(screen.getByLabelText('Vehicle Name:')).toBeInTheDocument();
  });

  it('searches vehicles by name', async () => {
    const user = userEvent.setup();
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search vehicles...');
    await user.type(searchInput, 'Honda');

    expect(screen.getByText('Honda Civic')).toBeInTheDocument();
    expect(screen.queryByText('Toyota Camry')).not.toBeInTheDocument();
  });

  it('filters vehicles by status', async () => {
    const user = userEvent.setup();
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const statusFilter = screen.getByLabelText('Filter by Status:');
    await user.selectOptions(statusFilter, 'Available');

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.queryByText('Honda Civic')).not.toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText('Edit');
    await user.click(editButtons[0]);

    expect(screen.getByText('Edit Vehicle')).toBeInTheDocument();
  });

  it('deletes vehicle when delete button is clicked and confirmed', async () => {
    const user = userEvent.setup();
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    apiService.deleteVehicle.mockResolvedValue({ message: 'Vehicle deleted' });

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    await waitFor(() => {
      expect(apiService.deleteVehicle).toHaveBeenCalledWith('1');
    });

    expect(apiService.getVehicles).toHaveBeenCalledTimes(2); // Initial load + after delete
  });

  it('does not delete vehicle when delete is cancelled', async () => {
    const user = userEvent.setup();
    // Mock window.confirm to return false
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(apiService.deleteVehicle).not.toHaveBeenCalled();
  });

  it('displays error message when API fails', async () => {
    apiService.getVehicles.mockRejectedValue(new Error('API Error'));

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch vehicles')).toBeInTheDocument();
    });
  });

  it('shows vehicle count', async () => {
    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Total Vehicles: 2')).toBeInTheDocument();
    });
  });

  it('handles empty vehicles array', async () => {
    apiService.getVehicles.mockResolvedValue([]);

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Total Vehicles: 0')).toBeInTheDocument();
    });

    expect(screen.getByText('No vehicles found.')).toBeInTheDocument();
  });

  it('validates form data when adding vehicle', async () => {
    const user = userEvent.setup();
    apiService.addVehicle.mockResolvedValue({ _id: '3', ...mockVehicles[0] });

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Vehicle');
    await user.click(addButton);

    // Try to submit empty form
    const submitButton = screen.getByText('Add Vehicle');
    await user.click(submitButton);

    expect(apiService.addVehicle).not.toHaveBeenCalled();
  });

  it('successfully adds a new vehicle', async () => {
    const user = userEvent.setup();
    const newVehicle = {
      _id: '3',
      name: 'BMW X3',
      brand: 'BMW',
      category: 'SUV',
      licensePlate: 'BMW-001',
      pricePerDay: 80,
      securityDeposit: 300,
      status: 'Available',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seatingCapacity: 5,
      mileage: '12 km/l',
      mainImage: 'data:image/png;base64,test3',
      description: 'A luxury SUV',
      features: ['AC', 'Leather Seats']
    };

    apiService.addVehicle.mockResolvedValue(newVehicle);

    render(<Vehicles />);

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Vehicle');
    await user.click(addButton);

    // Fill form
    const nameInput = screen.getByLabelText('Vehicle Name:');
    await user.type(nameInput, 'BMW X3');

    const brandInput = screen.getByLabelText('Brand:');
    await user.type(brandInput, 'BMW');

    const submitButton = screen.getByText('Add Vehicle');
    await user.click(submitButton);

    await waitFor(() => {
      expect(apiService.addVehicle).toHaveBeenCalled();
    });
  });
});