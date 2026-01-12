import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Payment from '../payment';

describe('Payment', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});