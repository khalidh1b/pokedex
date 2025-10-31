import { renderHook, act } from '@testing-library/react';
import useHandleFilter from '@/hooks/useHandleFilter';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import useFetchPokemon from '@/hooks/useFetchPokemon';

// Mock the dependencies
jest.mock('@/context/pokemonContext');
jest.mock('@/hooks/useFetchPokemon');

const mockUsePokemonContext = usePokemonContext as jest.Mock;
const mockUseFetchPokemon = useFetchPokemon as jest.Mock;

describe('useHandleFilter', () => {
  const mockSetPokemons = jest.fn();
  const mockFetchPokemon = jest.fn();
  const mockPokemons = [
    {
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    },
    {
      name: 'charmander',
      types: [{ type: { name: 'fire' } }],
    },
    {
      name: 'squirtle',
      types: [{ type: { name: 'water' } }],
    },
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
    mockUseFetchPokemon.mockReturnValue(mockFetchPokemon);
  });

  it('should return all necessary filter functions and state', () => {
    const { result } = renderHook(() => useHandleFilter());

    expect(typeof result.current.filterPokemons).toBe('function');
    expect(typeof result.current.resetFilter).toBe('function');
    expect(typeof result.current.handleCheckboxChange).toBe('function');
    expect(typeof result.current.setFilterOpen).toBe('function');
    expect(typeof result.current.filterOpen).toBe('boolean');
    expect(Array.isArray(result.current.filterTypes)).toBe(true);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHandleFilter());

    expect(result.current.filterOpen).toBe(false);
    expect(result.current.filterTypes).toEqual([]);
  });

  it('should handle checkbox change - adding new type', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.handleCheckboxChange('grass');
    });

    expect(result.current.filterTypes).toContain('grass');
  });

  it('should handle checkbox change - removing existing type', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.handleCheckboxChange('grass');
    });
    act(() => {
      result.current.handleCheckboxChange('grass');
    });

    expect(result.current.filterTypes).not.toContain('grass');
  });

  it('should filter pokemons by selected types', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.filterPokemons(['grass']);
    });

    expect(mockSetPokemons).toHaveBeenCalledWith([mockPokemons[0]]);
  });

  it('should filter pokemons by multiple types', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.filterPokemons(['grass', 'fire']);
    });

    expect(mockSetPokemons).toHaveBeenCalledWith([mockPokemons[0], mockPokemons[1]]);
  });

  it('should reset pokemons when no types are selected', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.filterPokemons([]);
    });

    expect(mockSetPokemons).toHaveBeenCalledWith(mockPokemons);
  });

  it('should reset filter and fetch pokemons', async () => {
    const { result } = renderHook(() => useHandleFilter());

    // First add some filters
    act(() => {
      result.current.handleCheckboxChange('grass');
    });
    expect(result.current.filterTypes).toContain('grass');

    // Then reset
    await act(async () => {
      await result.current.resetFilter();
    });

    expect(mockFetchPokemon).toHaveBeenCalled();
    expect(result.current.filterTypes).toEqual([]);
  });

  it('should toggle filter open state', () => {
    const { result } = renderHook(() => useHandleFilter());

    expect(result.current.filterOpen).toBe(false);

    act(() => {
      result.current.setFilterOpen(true);
    });

    expect(result.current.filterOpen).toBe(true);
  });

  it('should handle pokemon with no matching types', () => {
    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.filterPokemons(['electric']);
    });

    expect(mockSetPokemons).toHaveBeenCalledWith([]);
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

    const { result } = renderHook(() => useHandleFilter());

    act(() => {
      result.current.filterPokemons(['grass']);
    });

    expect(mockSetPokemons).toHaveBeenCalledWith([]);
  });
});
