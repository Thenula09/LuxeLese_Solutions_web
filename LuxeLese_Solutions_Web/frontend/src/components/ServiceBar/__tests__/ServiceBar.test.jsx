import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServiceBar from '../ServiceBar';

describe('ServiceBar', () => {
  it('renders service items', () => {
    render(<ServiceBar />);
    expect(screen.getByRole('heading', { name: /Rent/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Wedding/i })).toBeInTheDocument();
  });
});