import { usePokemonContext } from '@/context/pokemonContext';
import { useState } from 'react';
import useFetchPokemon from './useFetchPokemon';

const useHandleFilter = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterTypes, setFilterTypes] = useState<string[]>([])
    const { pokemons, setPokemon } = usePokemonContext();
    const fetchPokemon = useFetchPokemon();

    const handleCheckboxChange = (type: string) => {
        setFilterTypes((prev) => (
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        ))
    };

    const filterPokemons = (types: string[]) => {
        if(types.length === 0) {
            setPokemon(pokemons);
            return;
        };

        const filtered = pokemons.filter((pokemon) => {
            return pokemon.types.some((t) => types.includes(t.type.name));
        });
        setPokemon(filtered);
    };

    const resetFilter = async () => {
        await fetchPokemon();
        setFilterTypes([]);
    };
    
    return { filterPokemons, resetFilter, handleCheckboxChange, filterOpen, filterTypes, setFilterOpen }
};

export default useHandleFilter;