import { useState } from "react";
import axios from 'axios';
import { usePokemonContext } from "@/context/pokemonContext";

const useFetchPokemon = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setPokemon, pokemons } = usePokemonContext();

    const API = "https://pokeapi.co/api/v2/pokemon?limit=12";    
    
    const fetchPokemon = async () => {
        
        if(pokemons.length > 0) return;
        if(loading) return;

        try {
            setLoading(true);
            const res = await axios.get(API);
            console.log('fetching first time');

            const fetchPokemonDetails = res.data.results.map(async (pokemon: {url: string}) => {
                const detailsRes = await fetch(pokemon.url);
                return detailsRes.json();
            });
            
            const detailedPokemon = await Promise.all(fetchPokemonDetails);
            setPokemon(detailedPokemon);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // console.log('loading', loading);

    return fetchPokemon;
};

export default useFetchPokemon;