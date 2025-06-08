import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../use-theme';

describe('useTheme', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('persists toggle across sessions', () => {
    const { result, unmount } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
    act(() => result.current.toggleTheme());
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    unmount();

    const { result: result2 } = renderHook(() => useTheme(), { wrapper });
    expect(result2.current.theme).toBe('dark');
  });
});
