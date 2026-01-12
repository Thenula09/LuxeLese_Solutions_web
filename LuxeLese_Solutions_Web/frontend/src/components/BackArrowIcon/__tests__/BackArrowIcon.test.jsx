import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BackArrowIcon from '../../BackArrowIcon';

describe('BackArrowIcon', () => {
  it('renders an SVG with the correct size and color', () => {
    const { container } = render(<BackArrowIcon size={32} color="#123456" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute('width')).toBe('32');
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke', '#123456');
  });
});