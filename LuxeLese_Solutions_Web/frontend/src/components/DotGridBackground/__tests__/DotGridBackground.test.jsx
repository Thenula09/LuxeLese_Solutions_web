import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import DotGridBackground from '../../DotGridBackground';

beforeEach(() => {
  if (!globalThis.Path2D) globalThis.Path2D = class { arc() {} };
  if (!globalThis.ResizeObserver) globalThis.ResizeObserver = class { observe() {}; disconnect() {} };
});

describe('DotGridBackground', () => {
  it('renders a div with full width and height', () => {
    const { container } = render(<DotGridBackground />);
    const div = container.firstChild;
    expect(div).toBeInTheDocument();
    expect(div.tagName).toBe('DIV');
    expect(div.style.width).toBe('100%');
    expect(div.style.height).toBe('100vh');
  });

  it('renders children when provided', () => {
    const { getByText } = render(<DotGridBackground><span>Test Child</span></DotGridBackground>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});