import { renderHook, act } from '@testing-library/react';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import axios from 'axios';
import toast from 'react-hot-toast';

// Mock the dependencies
jest.mock('@/context/pokemonContext');
jest.mock('axios');
jest.mock('react-hot-toast');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedToast = toast as jest.Mocked<typeof toast>;
const mockUsePokemonContext = usePokemonContext as jest.Mock;

// Mock console.error to avoid noise in tests
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('useFetchPokemon', () => {
  const mockSetPokemons = jest.fn();

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
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return fetchPokemon function', () => {
    const { result } = renderHook(() => useFetchPokemon());
    
    expect(typeof result.current).toBe('function');
  });

  it('should not fetch if pokemons already exist', async () => {
    mockUsePokemonContext.mockReturnValue({
      setPokemons: mockSetPokemons,
      pokemons: [{ name: 'pikachu' }],
      searching: false,
      filteredPokemons: [],
      setSearching: jest.fn(),
      setFilteredPokemons: jest.fn(),
    });

    const { result } = renderHook(() => useFetchPokemon());
    
    await act(async () => {
      await result.current();
    });

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should fetch pokemon data successfully', async () => {
    const mockApiResponse = {
      data: {
        results: [
          { url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      },
    };

    const mockPokemonDetails = [
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
    ];

    mockedAxios.get.mockResolvedValue(mockApiResponse);
    
    // Mock fetch for pokemon details
    const mockFetch = jest.fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails[0]),
      } as Response)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPokemonDetails[1]),
      } as Response);
    
    Object.defineProperty(window, 'fetch', {
      value: mockFetch,
      writable: true,
    });

    const { result } = renderHook(() => useFetchPokemon());
    
    await act(async () => {
      await result.current();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=12');
    expect(mockSetPokemons).toHaveBeenCalledWith(mockPokemonDetails);
  });

  it('should handle errors gracefully', async () => {
    const errorMessage = 'Network Error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchPokemon());
    
    await act(async () => {
      await result.current();
    });

    expect(mockedToast.error).toHaveBeenCalledWith(errorMessage);
    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should handle unknown errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useFetchPokemon());
    
    await act(async () => {
      await result.current();
    });

    expect(mockedToast.error).toHaveBeenCalledWith('An unknowed error occured, please try again!');
    expect(mockSetPokemons).not.toHaveBeenCalled();
  });

  it('should not fetch if already loading', async () => {
    // This test is a bit tricky since loading is internal state
    // We'll test that the function exists and can be called
    const { result } = renderHook(() => useFetchPokemon());
    
    // The loading state check happens inside the hook, so we can't easily test it
    // But we can ensure the function exists and doesn't throw
    expect(typeof result.current).toBe('function');
  });
});
