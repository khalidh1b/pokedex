import { Card } from '@/components/ui/card';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { useEffect } from 'react';

export const Main = () => {

    const [fetchPokemon, pokemons, loading] = useFetchPokemon();
    
    useEffect(() => {
        fetchPokemon()
    }, [])

    console.log(pokemons)
    console.log(loading)

    return (
        <div className='grid grid-cols-4 gap-6 mt-24'>
            {
                pokemons.map((pokemon) => (
                    <Card 
                        key={pokemon.id} 
                        img={pokemon.sprites.other['official-artwork'].front_default}
                        name={pokemon.name}
                        rank={pokemon.id}
                        types={pokemon.types}
                    />
                ))
            }
        </div>
    )
};