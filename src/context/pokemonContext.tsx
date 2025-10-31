import { useState } from "react";
import { PokemonContext } from "@/hooks/usePokemonContext";
import type { Pokemon } from "@/types/pokemon";

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <PokemonContext.Provider value={{ pokemons, setLoading, loading, setPokemons, searching, setSearching }}>
            {children}
        </PokemonContext.Provider>
    )
};