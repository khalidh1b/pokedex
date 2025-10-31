import { createContext, useContext } from "react";
import type { PokemonContextType } from "@/types/pokemon";

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
    const pokemonContext = useContext(PokemonContext);
    if (!pokemonContext) {
        throw new Error("usePokemonContext must be used within a PokemonProvider");
    }
    return pokemonContext;
};