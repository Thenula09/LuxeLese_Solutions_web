import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Provide a lightweight localStorage mock for jsdom tests
const createStorage = () => {
  let store = {};
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
};

vi.stubGlobal('localStorage', createStorage());

// Provide a minimal location stub if not present
if (!globalThis.window.location) {
  vi.stubGlobal('location', { href: '/' });
}