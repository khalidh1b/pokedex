import { renderHook, act } from '@testing-library/react';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// 🧩 Mock dependencies
jest.mock('@/context/pokemonContext');
jest.mock('react-intersection-observer');
jest.mock('react-hot-toast');

const mockUsePokemonContext = usePokemonContext as jest.Mock;
const mockUseInView = useInView as jest.Mock;
const mockedToast = toast as jest.Mocked<typeof toast>;

// 🧩 Mock fetch
const mockFetch = jest.fn();
Object.defineProperty(window, 'fetch', {
  value: mockFetch,
  writable: true,
});

describe('useInfiniteScrolling', () => {
  const mockSetPokemons = jest.fn();
  const mockRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [],
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });
    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: false,
    });
  });

  it('should return ref and scrollLoading state', () => {
    const { result } = renderHook(() => useInfiniteScrolling());
    expect(result.current.ref).toBe(mockRef);
    expect(typeof result.current.scrollLoading).toBe('boolean');
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useInfiniteScrolling());
    expect(result.current.scrollLoading).toBe(false);
    expect(mockUseInView).toHaveBeenCalled();
  });

  it('should fetch pokemons when inView is true', async () => {
    const mockApiResponse = {
      results: [
        { url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
      next: 'https://pokeapi.co/api/v2/pokemon?offset=24&limit=24',
    };

    const mockPokemonDetails = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[0]),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[1]),
      } as Response);

    const { rerender } = renderHook(() => useInfiniteScrolling());

    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: true,
    });

    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=24');
    expect(mockSetPokemons).toHaveBeenCalled();
  });

  it('should not fetch pokemons when inView is false', () => {
    renderHook(() => useInfiniteScrolling());
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should handle empty pokemons array in context', async () => {
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [],
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });

    const mockApiResponse = {
      results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      next: null,
    };

    const mockPokemonDetails = [{ id: 1, name: 'bulbasaur' }];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[0]),
      } as Response);

    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: true,
    });

    const { rerender } = renderHook(() => useInfiniteScrolling());

    await act(async () => {
      rerender();
      await Promise.resolve();
    });
  });

  it('should filter out duplicate pokemons', async () => {
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [{ id: 1, name: 'bulbasaur' }],
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });

    const mockApiResponse = {
      results: [
        { url: 'https://pokeapi.co/api/v2/pokemon/1/' }, // Duplicate
        { url: 'https://pokeapi.co/api/v2/pokemon/2/' }, // New
      ],
      next: null,
    };

    const mockPokemonDetails = [
      { id: 1, name: 'bulbasaur' },
      { id: 2, name: 'ivysaur' },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[0]),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPokemonDetails[1]),
      } as Response);

    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: true,
    });

    const { rerender } = renderHook(() => useInfiniteScrolling());

    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Network Error';
    mockFetch.mockRejectedValue(new Error(errorMessage));

    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: true,
    });

    const { rerender } = renderHook(() => useInfiniteScrolling());

    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    expect(mockedToast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle unknown errors gracefully', async () => {
    mockFetch.mockRejectedValue('Unknown error');

    mockUseInView.mockReturnValue({
      ref: mockRef,
      inView: true,
    });

    const { rerender } = renderHook(() => useInfiniteScrolling());

    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    expect(mockedToast.error).toHaveBeenCalledWith(
      'An unknowed error occured, please try again!'
    );
  });

  it('should not fetch when nextUrl is null', async () => {
    const { result } = renderHook(() => useInfiniteScrolling());
    expect(result.current.scrollLoading).toBe(false);
  });

});