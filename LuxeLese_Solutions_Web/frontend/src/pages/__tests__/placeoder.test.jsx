import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlaceOrder from '../placeoder';

describe('PlaceOrder', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <PlaceOrder />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});