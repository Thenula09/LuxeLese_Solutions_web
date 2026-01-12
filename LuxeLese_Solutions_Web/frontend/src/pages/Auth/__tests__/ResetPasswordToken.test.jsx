import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ResetPasswordToken from '../ResetPasswordToken';

describe('ResetPasswordToken', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/reset-password-token/123']}>
        <Routes>
          <Route path="/reset-password-token/:token" element={<ResetPasswordToken />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});