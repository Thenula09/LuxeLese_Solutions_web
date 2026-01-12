import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../booking';

describe('Booking', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});