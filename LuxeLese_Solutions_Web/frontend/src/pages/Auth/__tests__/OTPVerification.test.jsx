import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OTPVerification from '../OTPVerification';

describe('OTPVerification', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <OTPVerification />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});