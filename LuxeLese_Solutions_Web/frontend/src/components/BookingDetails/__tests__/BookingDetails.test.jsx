import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingDetails from '../BookingDetails';

describe('BookingDetails', () => {
  const baseForm = { name: '', email: '', phone: '', whatsappNumber: '', address: '', notes: '' };

  it('shows booking summary when dates provided and calculates total', () => {
    const dates = ['2025-01-01', '2025-01-02'];
    const vehicle = { pricePerDay: 200 };
    const onChange = vi.fn();
    const onSubmit = vi.fn((e) => e && e.preventDefault());

    const { container } = render(
      <BookingDetails
        selectedDates={dates}
        formData={baseForm}
        onChange={onChange}
        onSubmit={onSubmit}
        vehicle={vehicle}
      />
    );

    expect(screen.getByText(/Booking Summary/i)).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();

    // Submit via button click (use role to get actual button)
    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('shows select-dates hint when no dates', () => {
    render(<BookingDetails selectedDates={[]} formData={baseForm} onChange={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText(/Select dates on the calendar/i)).toBeInTheDocument();
  });
});