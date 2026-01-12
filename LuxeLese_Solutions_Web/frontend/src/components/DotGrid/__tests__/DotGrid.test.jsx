import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import DotGrid from '../../DotGrid';

beforeEach(() => {
  if (!globalThis.Path2D) globalThis.Path2D = class { arc() {} };
  if (!globalThis.ResizeObserver) globalThis.ResizeObserver = class { observe() {}; disconnect() {} };
});

describe('DotGrid', () => {
  it('renders canvas element', () => {
    const { container } = render(<DotGrid />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});