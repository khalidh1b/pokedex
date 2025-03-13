import { Card } from '@/components/ui/card';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/context/pokemonContext';

export const Main = () => {
    const { pokemons, loading, imgLoaded, setImgLoaded, searching } = usePokemonContext();

    console.log(pokemons);
    console.log('pokemons');

    console.log('searchinghhhh',searching);
    console.log('imgloadeddd',imgLoaded);
    console.log('loading', loading);

    return (
        <div className='grid grid-cols-4 gap-6 '>
                
            {(loading) ? Array.from({ length: 12 }).map((_, idx) => (
                <CardSkeleton key={idx}/>
            ))  : 
                pokemons.map((pokemon) => (
                    <Card 
                        key={pokemon.id || pokemon[0].id} 
                        img={pokemon.sprites?.other['official-artwork']?.front_default || pokemon[0].sprites?.other['official-artwork']?.front_default}
                        name={pokemon.name || pokemon[0].name}
                        rank={pokemon.id || pokemon[0].id}
                        types={pokemon.types || pokemon[0].types}
                        setImgLoaded={setImgLoaded}
                    />
                ))
            }
            
        </div>
    )
};