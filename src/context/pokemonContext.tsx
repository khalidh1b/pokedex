import { createContext, useContext, useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
};

interface PokemonContextType {
    pokemons: Pokemon[];
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    loading: boolean;
    imgLoaded: boolean;
    setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    searching: boolean;
    setSearching: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
    const pokemonContext = useContext(PokemonContext);
    if (!pokemonContext) {
        throw new Error("usePokemonContext must be used within a PokemonProvider");
    }
    return pokemonContext;
};


export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
    const [pokemons, setPokemon] = useState<Pokemon[]>([]);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <PokemonContext.Provider value={{ pokemons,  setLoading, loading, setPokemon, imgLoaded, setImgLoaded, searching, setSearching }}>
            {children}
        </PokemonContext.Provider>
    )
};