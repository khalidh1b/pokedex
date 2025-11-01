export interface Pokemon {
    id: number;
    name: string;
    sprites: { 
        front_default: string;
        other?: {
            ['official-artwork']?: {
                front_default: string;
            };
        };
    };
    image?: string;
    types: { type: { name: string } }[];
    stats: Stat[];
    abilities: Ability[];
    height: number;
    weight: number;
    order: number;
};

export type PokemonDetailProps = {
  closeModal: () => void;
  pokemon: Pokemon
};


export interface PokemonContextType {
    pokemons: Pokemon[];
    setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    loading: boolean;
    searching: boolean;
    setSearching: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

export type PokemonDetailHeaderProp = {
  closeModal: () => void;
  order: string;
  name: string;
  image: string;
  types: { type: { name: string } }[]
};