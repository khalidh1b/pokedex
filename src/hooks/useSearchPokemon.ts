import { useState } from "react";
import useFetchPokemon from "./useFetchPokemon";
import { toast } from 'react-hot-toast';

export const useSearchPokemon = () => {
    const [searching, setSearching] = useState(false);
    const [fetchPokemon, pokemons, loading] = useFetchPokemon();
    const [searchedPokemons, setSearchedPokemons] = useState<any[]>([]);

    const handleSearch = async (query: string) => {
        setSearching(true);
        
        const localFiltered = pokemons.filter((pokemon) => (
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        ));

        const apiSearch = await searchPokemonApi(query);

        const combinedSearchResults = [...localFiltered, ...apiSearch || []];

        console.log('combinedSearchResults', combinedSearchResults);
        setSearchedPokemons(combinedSearchResults);
        setSearching(false);
    };

    return { handleSearch, searchedPokemons };
};


const searchPokemonApi = async (query: string) => {
    if(!query) return;
    const API = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    try {
        const res = await fetch(API);
        if(res.ok) {
            const data = await res.json();
            return [data];
        };
    } catch (error) {
        console.log("Error during API search:", error);
        toast.error('Error during API search, please try again!')
    }
};

export default searchPokemonApi;