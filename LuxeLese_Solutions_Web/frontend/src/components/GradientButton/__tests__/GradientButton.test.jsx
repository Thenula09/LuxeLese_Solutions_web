import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import GradientButton from '../GradientButton';

describe('GradientButton', () => {
  it('renders and fires onClick', () => {
    const onClick = vi.fn();
    render(<GradientButton onClick={onClick}>Click me</GradientButton>);
    const btn = screen.getByText('Click me');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    const onClick = vi.fn();
    render(
      <GradientButton onClick={onClick} disabled>
        Disabled
      </GradientButton>
    );
    const btn = screen.getByText('Disabled');
    expect(btn.closest('button')).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});