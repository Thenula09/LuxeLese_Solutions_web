import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WelcomeBox from '../WelcomeBox';

// Keep tests simple — avoid relying on intervals or key listeners
describe('WelcomeBox', () => {
  it('renders welcome text and at least one image', () => {
    const { container } = render(<WelcomeBox />);
    expect(screen.getByText(/Welcome Aboard/i)).toBeInTheDocument();
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});