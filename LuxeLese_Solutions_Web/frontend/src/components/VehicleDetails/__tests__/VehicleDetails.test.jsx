import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VehicleDetails from '../VehicleDetails';

describe('VehicleDetails', () => {
  it('renders vehicle info when provided', () => {
    const vehicle = { name: 'Model X', model: 'Model X 2025', pricePerDay: 300, users: 12, rating: 4.5, features: ['Auto', 'AC'] };
    render(<VehicleDetails vehicle={vehicle} />);
    expect(screen.getByText(/Model X/i)).toBeInTheDocument();
    expect(screen.getByText(/\$300\/day/i)).toBeInTheDocument();
    expect(screen.getByText(/Key Features/i)).toBeInTheDocument();
  });
});