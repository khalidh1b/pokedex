import { usePokemonContext } from '@/context/pokemonContext';
import { useEffect, useState } from 'react';

const useHandleSorting = () => {
    const { pokemons, setPokemon } = usePokemonContext();

    const [sortBy, setSortBy] = useState<string>('id-asc');
    // console.log(sortBy)

    const sortPokemons = () => { 
        setPokemon([...pokemons].sort((a, b) => {
            switch (sortBy) {
                case 'id-asc':
                    return a.id - b.id
                case 'id-desc':
                    return b.id - a.id 
                case 'id-asc-alpha':
                    return a.name.localeCompare(b.name)
                case 'id-desc-alpha':
                    return b.name.localeCompare(a.name)
            }
        }))
    };

    useEffect(() => {
        sortPokemons();
    }, [sortBy]);

    return { sortBy, setSortBy };
};

export default useHandleSorting;