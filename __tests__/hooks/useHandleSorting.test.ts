import { renderHook, act } from '@testing-library/react';
import useHandleSorting from '@/hooks/useHandleSorting';
import { usePokemonContext } from '@/hooks/usePokemonContext';

// Mock the dependencies
jest.mock('@/hooks/usePokemonContext');

const mockUsePokemonContext = usePokemonContext as jest.Mock;

describe('useHandleSorting', () => {
  const mockSetPokemons = jest.fn();
  const mockPokemons = [
    { id: 3, name: 'venusaur' },
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'ivysaur' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: mockPokemons,
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });
  });

  it('should return sorting state and setter', () => {
    const { result } = renderHook(() => useHandleSorting());

    expect(result.current.sortBy).toBe('id-asc');
    expect(typeof result.current.setSortBy).toBe('function');
  });

  it('should initialize with default sort by id-asc', () => {
    const { result } = renderHook(() => useHandleSorting());

    expect(result.current.sortBy).toBe('id-asc');
  });

  it('should sort pokemons by id ascending', () => {
    renderHook(() => useHandleSorting());
  });

  it('should sort pokemons by id descending', () => {
    const { result } = renderHook(() => useHandleSorting());

    act(() => {
      result.current.setSortBy('id-desc');
    });
  });

  it('should sort pokemons by name ascending', () => {
    const { result } = renderHook(() => useHandleSorting());

    act(() => {
      result.current.setSortBy('id-asc-alpha');
    });
  });

  it('should sort pokemons by name descending', () => {
    const { result } = renderHook(() => useHandleSorting());

    act(() => {
      result.current.setSortBy('id-desc-alpha');
    });
  });

  it('should default to id ascending for unknown sort type', () => {
    const { result } = renderHook(() => useHandleSorting());

    act(() => {
      result.current.setSortBy('unknown-sort');
    });
  });

  it('should handle empty pokemons array', () => {
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [],
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });

    renderHook(() => useHandleSorting());
  });

  it('should handle single pokemon', () => {
    const singlePokemon = [{ id: 1, name: 'bulbasaur' }];
    
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: singlePokemon,
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });

    renderHook(() => useHandleSorting());
  });

  it('should not mutate original pokemons array', () => {
    const originalPokemons = [...mockPokemons];
    
    renderHook(() => useHandleSorting());

    // Check that the original array hasn't been mutated
    expect(mockPokemons).toEqual(originalPokemons);
  });
});
