import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewBox from '../ReviewBox';

describe('ReviewBox', () => {
  it('renders sample reviews and author names', () => {
    render(<ReviewBox />);
    expect(screen.getByText(/Amazing experience!/i)).toBeInTheDocument();
    expect(screen.getByText(/S. Silva/i)).toBeInTheDocument();
  });
});