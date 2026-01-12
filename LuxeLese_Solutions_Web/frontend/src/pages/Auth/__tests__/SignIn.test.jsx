import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../SignIn';

describe('SignIn', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});