import { useEffect, useState } from "react";

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
};

const useFetchPokemon = (): [() => Promise<void>, Pokemon[], boolean, React.Dispatch<React.SetStateAction<Pokemon[]>>] => {
    const [pokemons, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    
    const fetchPokemon = async () => {
        if(pokemons.length > 0) return;

        console.log('useFetchPokemon calling!', pokemons);
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

    useEffect(() => {
        fetchPokemon()
    }, []);

    return [fetchPokemon, pokemons, loading, setPokemon];
};

export default useFetchPokemon;