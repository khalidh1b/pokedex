import useFetchPokemon from "@/hooks/useFetchPokemon";
import { createContext, useContext, useEffect, useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
};

interface PokemonContextType {
    pokemons: Pokemon[];
    fetchPokemon: () => Promise<void>;
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    loading: boolean;
    imgLoaded: boolean;
    setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    searching: boolean;
    setSearching: React.Dispatch<React.SetStateAction<boolean>>
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
    const [fetchPokemon, pokemons, loading, setPokemon] = useFetchPokemon();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [searching, setSearching] = useState(false);

    return (
        <PokemonContext.Provider value={{ fetchPokemon, pokemons, loading, setPokemon, imgLoaded, setImgLoaded, searching, setSearching }}>
            {children}
        </PokemonContext.Provider>
    )
};