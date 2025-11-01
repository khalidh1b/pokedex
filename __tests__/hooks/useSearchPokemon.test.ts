import { renderHook, act } from '@testing-library/react';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import toast from 'react-hot-toast';

// Mock the dependencies
jest.mock('@/hooks/usePokemonContext');
jest.mock('react-hot-toast');

const mockUsePokemonContext = usePokemonContext as jest.Mock;
const mockedToast = toast as jest.Mocked<typeof toast>;

// Mock fetch
const mockFetch = jest.fn();
Object.defineProperty(window, 'fetch', {
  value: mockFetch,
  writable: true,
});

describe('useSearchPokemon', () => {
  const mockSetPokemons = jest.fn();
  const mockSetSearching = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePokemonContext.
    mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [],
      searching: false,
      filteredPokemons: [],
      setSearching: mockSetSearching,
      setFilteredPokemons: jest.fn(),
    });
  });

  it('should return handleSearch function', () => {
    const { result } = renderHook(() => useSearchPokemon());

    expect(typeof result.current.handleSearch).toBe('function');
  });

  it('should search pokemon by name successfully', async () => {
    const mockPokemonData = { name: 'pikachu', id: 25 };
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonData),
      } as Response);

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('pikachu');
    });

    expect(mockSetSearching).toHaveBeenCalledWith(true);
    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(mockSetPokemons).toHaveBeenCalledWith([mockPokemonData]);
    expect(mockSetSearching).toHaveBeenCalledWith(false);
  });

  it('should search pokemon by id successfully', async () => {
    const mockPokemonData = { name: 'bulbasaur', id: 1 };
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonData),
      } as Response);

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('1');
    });

    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    expect(mockSetPokemons).toHaveBeenCalledWith([mockPokemonData]);
  });

  it('should search pokemon by type successfully', async () => {
    const mockTypeData = {
      pokemon: [
        { pokemon: { url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur' } },
        { pokemon: { url: 'https://pokeapi.co/api/v2/pokemon/4/', name: 'charmander' } },
      ],
    };

    const mockPokemonDetails = [
      { name: 'bulbasaur', id: 1 },
      { name: 'charmander', id: 4 },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: false,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTypeData),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[0]),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[1]),
      } as Response);

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('grass');
    });

    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/grass');
    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/grass');
    expect(mockSetPokemons).toHaveBeenCalled();
  });

  it('should show error toast when no pokemon found', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
      } as Response);

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('nonexistent');
    });

    expect(mockedToast.error).toHaveBeenCalledWith('No Pokémon matched your search!');
    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should handle empty query', async () => {
    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('');
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockSetSearching).toHaveBeenCalledWith(true);
    expect(mockSetSearching).toHaveBeenCalledWith(false);
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('pikachu');
    });

    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should handle unknown errors gracefully', async () => {
    mockFetch.mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('pikachu');
    });

    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should handle type search API errors', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
      } as Response)
      .mockRejectedValue(new Error('Type API Error'));

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('unknown-type');
    });

  });

  it('should convert query to lowercase', async () => {
    const mockPokemonData = { name: 'pikachu', id: 25 };
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonData),
      } as Response);

    const { result } = renderHook(() => useSearchPokemon());

    await act(async () => {
      await result.current.handleSearch('PIKACHU');
    });

    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
  });
});
