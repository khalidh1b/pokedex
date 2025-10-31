import { usePokemonContext } from '@/hooks/usePokemonContext';
import { useEffect, useState, useCallback } from 'react';

const useHandleSorting = () => {
    const { setPokemons } = usePokemonContext();

    const [sortBy, setSortBy] = useState<string>('id-asc');
    // console.log("sortby", sortBy);

    const sortPokemons = useCallback(() => {
        setPokemons((prevPokemons) =>
            [...prevPokemons].sort((a, b) => {
                switch (sortBy) {
                    case 'id-asc':
                        return a.id - b.id;
                    case 'id-desc':
                        return b.id - a.id;
                    case 'id-asc-alpha':
                        return a.name.localeCompare(b.name);
                    case 'id-desc-alpha':
                        return b.name.localeCompare(a.name);
                    default:
                        return a.id - b.id;
                }
            })
        );
    }, [sortBy, setPokemons]);

    useEffect(() => {
        sortPokemons();
    }, [sortPokemons]);

    return { sortBy, setSortBy };
};

export default useHandleSorting;