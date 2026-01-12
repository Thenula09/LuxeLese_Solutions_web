import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../ResetPassword';

describe('ResetPassword', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});