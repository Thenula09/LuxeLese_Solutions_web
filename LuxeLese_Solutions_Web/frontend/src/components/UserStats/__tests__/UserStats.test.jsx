import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserStats from '../UserStats';

describe('UserStats', () => {
  it('renders the stats section and a known value', () => {
    render(<UserStats />);
    expect(screen.getByText(/Our Achievements/i)).toBeInTheDocument();
    expect(screen.getByText(/20\+/i)).toBeInTheDocument();
  });
});