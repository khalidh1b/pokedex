import { useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
};

const useFetchPokemon = (): [() => Promise<void>, Pokemon[], boolean] => {
    const [pokemons, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    
    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const res = await fetch(API);
            const data = await res.json();
            setLoading(false);

            const fetchPokemonDetails = data.results.map(async (pokemon: {url: string}) => {
                const detailsRes = await fetch(pokemon.url);
                return detailsRes.json();
            });

            const detailedPokemon = await Promise.all(fetchPokemonDetails);
            setPokemon(detailedPokemon);

        } catch (error) {
            console.log(error);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };

    return [fetchPokemon, pokemons, loading];
};

export default useFetchPokemon;