import { Card } from '@/components/ui/card';
// import useFetchPokemon from '@/hooks/useFetchPokemon';
import { useEffect } from 'react';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/context/pokemonContext';

export const Main = () => {
    // const [fetchPokemon, pokemons, loading, ] = useFetchPokemon();
    const { fetchPokemon, pokemons, loading, setPokemon } = usePokemonContext();

    useEffect(() => {
        fetchPokemon()
    }, [])

    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    // console.log(pokemons);
    console.log(pokemons);
    console.log('pokemons');
    console.log(loading);

    return (
        <div className='grid grid-cols-4 gap-6 '>
                
            {loading && Array.from({ length: 12 }).map((_, idx) => (
                <CardSkeleton key={idx}/>
            ))}
            
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