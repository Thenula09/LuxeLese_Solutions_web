import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Calendar from '../Calendar';

beforeEach(() => {
  if (!globalThis.Path2D) globalThis.Path2D = function () {};
  if (!globalThis.ResizeObserver) globalThis.ResizeObserver = class { observe() {}; disconnect() {} };
});

describe('Calendar', () => {
  it('renders month header and navigates months', () => {
    const onDateSelect = () => {};
    const { container } = render(<Calendar onDateSelect={onDateSelect} />);

    const header = container.querySelector('.calendar-month-year');
    expect(header).toBeInTheDocument();
    const initial = header.textContent;

    const buttons = container.querySelectorAll('.calendar-nav-btn');
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    // Click next month and expect header to change
    fireEvent.click(buttons[1]);
    expect(header.textContent).not.toBe(initial);
  });
});