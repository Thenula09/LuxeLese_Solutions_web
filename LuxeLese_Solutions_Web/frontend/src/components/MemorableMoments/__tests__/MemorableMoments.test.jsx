import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MemorableMoments from '../memorable_moments';

describe('MemorableMoments', () => {
  it('renders heading and items', () => {
    render(<MemorableMoments />);
    expect(screen.getByText(/Memorable/i)).toBeInTheDocument();
  });
});