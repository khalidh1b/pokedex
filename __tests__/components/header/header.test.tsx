import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/header/header';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import useThemeToggle from '@/hooks/useThemeToggle';
import useHandleSorting from '@/hooks/useHandleSorting';
import { usePokemonContext } from '@/hooks/usePokemonContext';

jest.mock('@/hooks/useSearchPokemon');
jest.mock('@/hooks/useThemeToggle');
jest.mock('@/hooks/useHandleSorting');
jest.mock('@/hooks/usePokemonContext');

describe('Header', () => {
  const mockUseSearchPokemon = useSearchPokemon as jest.Mock;
  const mockHandleThemeToggle = useThemeToggle as jest.Mock;
  const mockUseHandleSorting = useHandleSorting as jest.Mock;
  const mockUsePokemonContext = usePokemonContext as jest.Mock;

  beforeEach(() => {
    mockUseSearchPokemon.mockReturnValue({ handleSearch: jest.fn() });
    mockHandleThemeToggle.mockReturnValue({ handleThemeChange: jest.fn(), theme: 'light' });
    mockUseHandleSorting.mockReturnValue({ sortBy: 'id', setSortBy: jest.fn() });
    mockUsePokemonContext.mockReturnValue({ searching: false });
  });

  it('should render the logo, search input, and buttons', () => {
    render(<Header />);
    expect(screen.getByRole('img', { name: /pokedex/i })).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/pokemon name, number or type/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /search/i })
    ).toBeInTheDocument();
  });

  it('should call handleSearch when the search form is submitted', () => {
    const handleSearch = jest.fn();
    mockUseSearchPokemon.mockReturnValue({ handleSearch });
    render(<Header />);
    const input = screen.getByPlaceholderText(/pokemon name, number or type/i);
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    if (form) {
      fireEvent.submit(form);
    }

    expect(handleSearch).toHaveBeenCalledWith('pikachu');
  });
});
