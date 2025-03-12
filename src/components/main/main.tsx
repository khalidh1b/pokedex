import { Card } from '@/components/ui/card';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { useEffect } from 'react';

export const Main = () => {

    const [fetchPokemon, pokemons, loading] = useFetchPokemon();
    
    useEffect(() => {
        fetchPokemon()
    }, [])

    console.log(pokemons)

    return (
        <div className='grid grid-cols-4 gap-6 mt-24'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
};