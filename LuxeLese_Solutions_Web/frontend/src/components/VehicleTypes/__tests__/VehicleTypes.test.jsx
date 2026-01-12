import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VehicleTypes from '../VehicleTypes';

describe('VehicleTypes', () => {
  it('renders a list of vehicle types when provided', () => {
    const types = [{ id: 1, name: 'SUV' }, { id: 2, name: 'Sedan' }];
    render(<VehicleTypes types={types} />);
    expect(screen.getByText(/SUV/i)).toBeInTheDocument();
    expect(screen.getByText(/Sedan/i)).toBeInTheDocument();
  });
});