import { render, screen, act } from '@testing-library/react';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import { PokemonProvider } from '@/context/pokemonContext';

// Test component to consume the context
const TestComponent = () => {
  const context = usePokemonContext();
  
  return (
    <div>
      <div data-testid="pokemons-count">{context.pokemons.length}</div>
      <div data-testid="loading">{context.loading.toString()}</div>
      <div data-testid="searching">{context.searching.toString()}</div>
      <button
        onClick={() => context.setPokemons([{ id: 1, name: 'bulbasaur', sprites: { front_default: '' }, types:[],
        stats: [{ base_stat: 45, stat: { name: 'hp',url: 'https://pokeapi.co/api/v2/stat/1/'},effort: 0}],
        height: 7,
        weight: 69,
        order: 1,
        image: '',
        abilities: [{ ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' }, is_hidden: false, slot: 1 }, { ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' }, is_hidden: true, slot: 3 }]
      }])}
        data-testid="set-pokemons"
      >
        Set Pokemons
      </button>
      <button
        onClick={() => context.setLoading(true)}
        data-testid="set-loading"
      >
        Set Loading
      </button>
      <button
        onClick={() => context.setSearching(true)}
        data-testid="set-searching"
      >
        Set Searching
      </button>
    </div>
  );
};

describe('PokemonContext', () => {
  it('should provide default context values', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(screen.getByTestId('pokemons-count')).toHaveTextContent('0');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('searching')).toHaveTextContent('false');
  });

  it('should update pokemons state', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    const setPokemonsButton = screen.getByTestId('set-pokemons');
    
    act(() => {
      setPokemonsButton.click();
    });

    expect(screen.getByTestId('pokemons-count')).toHaveTextContent('1');
  });

  it('should update loading state', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    const setLoadingButton = screen.getByTestId('set-loading');
    
    act(() => {
      setLoadingButton.click();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('should update searching state', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    const setSearchingButton = screen.getByTestId('set-searching');
    
    act(() => {
      setSearchingButton.click();
    });

    expect(screen.getByTestId('searching')).toHaveTextContent('true');
  });

  it('should throw error when usePokemonContext is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('usePokemonContext must be used within a PokemonProvider');

    consoleError.mockRestore();
  });

  it('should maintain state across re-renders', () => {
    const { rerender } = render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    // Initial state
    expect(screen.getByTestId('pokemons-count')).toHaveTextContent('0');

    // Update state
    const setPokemonsButton = screen.getByTestId('set-pokemons');
    act(() => {
      setPokemonsButton.click();
    });

    // Re-render and check state is maintained
    rerender(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    expect(screen.getByTestId('pokemons-count')).toHaveTextContent('1');
  });

  it('should handle multiple state updates', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    const setPokemonsButton = screen.getByTestId('set-pokemons');
    const setLoadingButton = screen.getByTestId('set-loading');
    const setSearchingButton = screen.getByTestId('set-searching');

    act(() => {
      setPokemonsButton.click();
      setLoadingButton.click();
      setSearchingButton.click();
    });

    expect(screen.getByTestId('pokemons-count')).toHaveTextContent('1');
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('searching')).toHaveTextContent('true');
  });

  it('should handle empty pokemons array', () => {
    render(
      <PokemonProvider>
        <TestComponent />
      </PokemonProvider>
    );

    const setPokemonsButton = screen.getByTestId('set-pokemons');
    
    // Set to empty array
    act(() => {
      setPokemonsButton.click();
    });
        
    // The test component always sets one pokemon, so we need to test differently
    // Let's create a component that can set empty array
    const TestComponentWithEmpty = () => {
      const context = usePokemonContext();
      
      return (
        <div>
          <div data-testid="pokemons-count">{context.pokemons.length}</div>
          <button
            onClick={() => context.setPokemons([])}
            data-testid="set-empty-pokemons"
          >
            Set Empty Pokemons
          </button>
        </div>
      );
    };

    render(
      <PokemonProvider>
        <TestComponentWithEmpty />
      </PokemonProvider>
    );

    const setEmptyButton = screen.getByTestId('set-empty-pokemons');
    act(() => {
      setEmptyButton.click();
    });
  });
});
