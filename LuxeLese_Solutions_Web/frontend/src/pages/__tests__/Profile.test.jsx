import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../Profile';

describe('Profile', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});