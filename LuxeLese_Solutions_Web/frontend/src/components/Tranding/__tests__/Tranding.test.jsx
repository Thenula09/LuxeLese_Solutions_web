import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Tranding from '../tranding';

describe('Tranding', () => {
  it('renders list of trending items by mocking fetch', async () => {
    const mockData = { success: true, data: [{ name: 'Car A', category: 'SUV' }, { name: 'Car B', category: 'Sedan' }] };
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) }));

    render(
      <MemoryRouter>
        <Tranding />
      </MemoryRouter>
    );

    // Wait for one of the mocked car names to appear
    expect(await screen.findByText(/Car A/i)).toBeInTheDocument();

    // Cleanup mock
    global.fetch = undefined;
  });
});