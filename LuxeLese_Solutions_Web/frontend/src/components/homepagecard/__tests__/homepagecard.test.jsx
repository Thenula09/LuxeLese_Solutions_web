import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomepageCard from '../homepagecard';

describe('HomepageCard', () => {
  it('renders the welcome message', () => {
    render(<HomepageCard />);
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });
});