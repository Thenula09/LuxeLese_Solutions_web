import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../About';

describe('About', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});