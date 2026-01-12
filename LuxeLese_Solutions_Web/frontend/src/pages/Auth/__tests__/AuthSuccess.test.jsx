import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthSuccess from '../AuthSuccess';

describe('AuthSuccess', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthSuccess />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});