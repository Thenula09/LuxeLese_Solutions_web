import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Loading from '../Loading';

describe('Loading', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});