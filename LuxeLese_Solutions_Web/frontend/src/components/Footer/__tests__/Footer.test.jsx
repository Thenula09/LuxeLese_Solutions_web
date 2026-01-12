import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../footer';

describe('Footer', () => {
  it('renders and shows contact or copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('© 2024 LuxeLese Solutions. All rights reserved.')).toBeInTheDocument();
  });
});