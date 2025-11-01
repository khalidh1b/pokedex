import { useState } from "react";
import axios from 'axios';
import { usePokemonContext } from "@/hooks/usePokemonContext";
import { toast } from "react-hot-toast";

const useFetchPokemon = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setPokemons, pokemons } = usePokemonContext();

    const API = "https://pokeapi.co/api/v2/pokemon?limit=12";    
    
    const fetchPokemon = async () => {
        
        if(pokemons.length > 0) return;
        if(loading) return;

        try {
            setLoading(true);
            const res = await axios.get(API);
            // console.log('fetching first time');

            const fetchPokemonDetails = res.data.results.map(async (pokemon: {url: string}) => {
                const detailsRes = await fetch(pokemon.url);
                return detailsRes.json();
            });
            
            const detailedPokemon = await Promise.all(fetchPokemonDetails);
            setPokemons(detailedPokemon);
            
        } catch (error) {
            // console.error(error);
            const err = error as Error;
            toast.error(err?.message || 'An unknowed error occured, please try again!')
        } finally {
            setLoading(false);
        }
    };

    // console.log('loading', loading);

    return fetchPokemon;
};

export default useFetchPokemon;