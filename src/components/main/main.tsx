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
                pokemons.map((pokemon) => {
                    const currentPokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon;

                    return (
                        <Card 
                            key={currentPokemon.id} 
                            img={currentPokemon.sprites?.other['official-artwork']?.front_default}
                            name={currentPokemon.name}
                            rank={currentPokemon.id}
                            types={currentPokemon.types}
                            setImgLoaded={setImgLoaded}
                        />
                    )
                })
            }
            
        </div>
    )
};