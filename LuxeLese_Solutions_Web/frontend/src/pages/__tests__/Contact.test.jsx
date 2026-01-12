import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../Contact';

describe('Contact', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});