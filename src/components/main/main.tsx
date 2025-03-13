import { Card } from '@/components/ui/card';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/context/pokemonContext';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';

export const Main = () => {
    const { pokemons, loading, imgLoaded, setImgLoaded } = usePokemonContext();
    const { searching } = useSearchPokemon();

    console.log(pokemons);
    console.log('pokemons');
    console.log('searchinghhhh',searching);
    console.log('imgloadeddd',imgLoaded);
    console.log(loading);

    return (
        <div className='grid grid-cols-4 gap-6 '>
                
            {loading || !searching || !imgLoaded && Array.from({ length: 12 }).map((_, idx) => (
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
                        setImgLoaded={setImgLoaded}
                    />
                ))
            }
        </div>
    )
};