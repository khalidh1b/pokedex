import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { usePokemonContext } from "@/context/pokemonContext";

export const useSearchPokemon = () => {
    const [searching, setSearching] = useState(false);
    const { pokemons, setPokemon, setImgLoaded } = usePokemonContext();

    const handleSearch = async (query: string) => {
        try {
            setImgLoaded(false);
            setSearching(true);

            console.log('setsearching', searching)

            const localFiltered = pokemons.filter((pokemon) => (
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            ));
    
            const apiSearch = await searchPokemonApi(query);
    
            const combinedSearchResults = [...localFiltered, ...apiSearch || []];
    
            console.log('combinedSearchResults', combinedSearchResults);
            setPokemon([...combinedSearchResults]);

        } catch (error) {
            if(error instanceof Error)
            toast.error(error.message || 'An unknown error occured');
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        setSearching(true);
    }, [searching]);

    return { handleSearch, searching };
};


const searchPokemonApi = async (query: string) => {
    if(!query) return;
    const API = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    try {
        const res = await fetch(API);
        if(res.ok) {
            const data = await res.json();
            return [data];
        } else {
            toast.error('pokemon not found');
        }
    } catch (error) {
        console.log("Error during API search:", error);
        toast.error('Error during API search, please try again!')
    }
};