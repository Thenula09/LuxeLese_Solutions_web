import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isAuthenticated,
  getCurrentUser,
  getToken,
  setAuthData,
  logout,
  getAuthHeaders,
  isAdmin,
  onAuthStateChange
} from '../auth';

beforeEach(() => {
  // stub localStorage for jsdom environment
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

  // reset location
  delete window.location;
  window.location = { href: '/' };
});

describe('auth utilities', () => {
  it('isAuthenticated returns false when no token', () => {
    expect(isAuthenticated()).toBe(false);
  });

  it('setAuthData stores token and user and isAuthenticated true', () => {
    setAuthData('abc.token', { name: 'Test', role: 'user' });
    expect(getToken()).toBe('abc.token');
    expect(isAuthenticated()).toBe(true);
    expect(getCurrentUser()).toEqual({ name: 'Test', role: 'user' });
  });

  it('getAuthHeaders includes Authorization when token exists', () => {
    setAuthData('token123', { name: 'A' });
    const headers = getAuthHeaders();
    expect(headers.Authorization).toBe('Bearer token123');
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('logout removes token and redirects to /signin', () => {
    setAuthData('t', { name: 'A' });
    expect(isAuthenticated()).toBe(true);
    logout();
    expect(isAuthenticated()).toBe(false);
    expect(window.location.href).toBe('/signin');
  });

  it('isAdmin returns true only when user role is admin', () => {
    setAuthData('t', { name: 'A', role: 'admin' });
    expect(isAdmin()).toBe(true);
    setAuthData('t2', { name: 'B', role: 'user' });
    expect(isAdmin()).toBe(false);
  });

  it('onAuthStateChange registers and cleans up listener', () => {
    const cb = vi.fn();
    const cleanup = onAuthStateChange(cb);
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    expect(cb).toHaveBeenCalled();
    cb.mockReset();
    cleanup();
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    expect(cb).not.toHaveBeenCalled();
  });
});