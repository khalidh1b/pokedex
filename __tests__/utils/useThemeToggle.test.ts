import { renderHook, act } from '@testing-library/react';
import useThemeToggle from '@/hooks/useThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.documentElement
Object.defineProperty(document.documentElement, 'classList', {
  value: {
    toggle: jest.fn(),
  },
  writable: true,
});

describe('handleThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with light theme when localStorage has no theme', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useThemeToggle());
    
    expect(result.current.theme).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('poketex-theme');
  });

  it('should initialize with dark theme when localStorage has dark theme', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useThemeToggle());
    
    expect(result.current.theme).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('poketex-theme');
  });

  it('should initialize with light theme when localStorage has light theme', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    const { result } = renderHook(() => useThemeToggle());
    
    expect(result.current.theme).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('poketex-theme');
  });

  it('should toggle theme and update localStorage when handleThemeChange is called', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    const { result } = renderHook(() => useThemeToggle());
    
    expect(result.current.theme).toBe(false);
    
    act(() => {
      result.current.handleThemeChange();
    });
    
    expect(result.current.theme).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('poketex-theme', 'dark');
  });

  it('should toggle from dark to light theme', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { result } = renderHook(() => useThemeToggle());
    
    expect(result.current.theme).toBe(true);
    
    act(() => {
      result.current.handleThemeChange();
    });
    
    expect(result.current.theme).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('poketex-theme', 'light');
  });

  it('should update document class when theme changes', () => {
    localStorageMock.getItem.mockReturnValue('light');
    
    renderHook(() => useThemeToggle());
    
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', false);
  });
});
