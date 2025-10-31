import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/common/image';
import { Pokebol } from '@/components/ui/pokebol';
import { getColorType } from '@/utils/getColorType';
import { getBgColorType } from '@/utils/getBgColorType';
import { capitalizedText } from '@/utils/capitalizedText';

// Mock the dependencies
jest.mock('@/components/common/image');
jest.mock('@/components/ui/pokebol');
jest.mock('@/utils/getColorType');
jest.mock('@/utils/getBgColorType');
jest.mock('@/utils/capitalizedText');

const MockedImage = Image as jest.MockedFunction<typeof Image>;
const MockedPokebol = Pokebol as jest.MockedFunction<typeof Pokebol>;
const mockedGetColorType = getColorType as jest.MockedFunction<typeof getColorType>;
const mockedGetBgColorType = getBgColorType as jest.MockedFunction<typeof getBgColorType>;
const mockedCapitalizedText = capitalizedText as jest.MockedFunction<typeof capitalizedText>;

// Mock implementations
MockedImage.mockImplementation(({ src, className, alt }) => 
  <img src={src} className={className} alt={alt} data-testid="pokemon-image" />
);

MockedPokebol.mockImplementation(() => <div data-testid="pokebol" />);

describe('Card', () => {
  const mockOpenModal = jest.fn();
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
    stats: [],
    abilities: [],
    height: 7,
    weight: 69,
    order: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetColorType.mockReturnValue('bg-[#80E177]');
    mockedGetBgColorType.mockReturnValue('bg-[#1EBA11]');
    mockedCapitalizedText.mockImplementation((text) => text.charAt(0).toUpperCase() + text.slice(1));
  });

  it('should render card with pokemon information', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    expect(screen.getByTestId('pokemon-image')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
    expect(screen.getByTestId('pokebol')).toBeInTheDocument();
  });

  it('should call openModal when card is clicked', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    const card = screen.getByText('Bulbasaur').closest('div');
    fireEvent.click(card!);

    expect(mockOpenModal).toHaveBeenCalledWith(mockPokemon);
  });

  it('should apply correct background color based on first type', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    expect(mockedGetBgColorType).toHaveBeenCalledWith('grass');
  });

  it('should display correct type colors', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    expect(mockedGetColorType).toHaveBeenCalledWith('grass');
    expect(mockedGetColorType).toHaveBeenCalledWith('poison');
  });

  it('should capitalize pokemon name', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    expect(mockedCapitalizedText).toHaveBeenCalledWith('bulbasaur');
  });

  it('should handle single type pokemon', () => {
    const singleTypePokemon = {
      ...mockPokemon,
      types: [{ type: { name: 'fire' } }],
    };

    render(
      <Card
        img="charmander.png"
        name="charmander"
        rank={4}
        types={singleTypePokemon.types}
        openModal={mockOpenModal}
        pokemon={singleTypePokemon}
      />
    );

    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.queryByText('poison')).not.toBeInTheDocument();
  });

  it('should handle empty types array', () => {
    render(
      <Card
        img="unknown.png"
        name="unknown"
        rank={0}
        types={[]}
        openModal={mockOpenModal}
        pokemon={{ ...mockPokemon, types: [] }}
      />
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('#0')).toBeInTheDocument();
  });

  it('should handle missing name', () => {
    render(
      <Card
        img="test.png"
        name=""
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={{ ...mockPokemon, name: '' }}
      />
    );

    expect(mockedCapitalizedText).toHaveBeenCalledWith('');
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('should render Pokebol component', () => {
    render(
      <Card
        img="bulbasaur.png"
        name="bulbasaur"
        rank={1}
        types={mockPokemon.types}
        openModal={mockOpenModal}
        pokemon={mockPokemon}
      />
    );

    expect(MockedPokebol).toHaveBeenCalled();
  });

  it('should handle undefined types gracefully', () => {
    render(
      <Card
        img="test.png"
        name="test"
        rank={1}
        types={undefined}
        openModal={mockOpenModal}
        pokemon={{ ...mockPokemon, types: [] }}
      />
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });
});
