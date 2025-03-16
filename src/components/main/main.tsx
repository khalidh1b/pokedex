import { Card } from '@/components/ui/card';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/context/pokemonContext';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useEffect, useState } from 'react';
import { PokemonDetail } from '@/components/pokemon-detail/pokemon-detail';
import useFetchPokemon from '@/hooks/useFetchPokemon';

export const Main = () => {
    const { pokemons, loading, searching, imgLoaded, setImgLoaded } = usePokemonContext();
    const { ref, scrollLoading } = useInfiniteScrolling();
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const fetchPokemon = useFetchPokemon();

    useEffect(() => {
        fetchPokemon();
    }, []);

    const openModal = (pokemon: any) => {
        setSelectedPokemon(pokemon);
    };

    const closeModal = () => {
        setSelectedPokemon(null);
    };

    // console.log('loading',loading, 'scrollloading',scrollLoading, 'searching',searching);
    
    // console.log('imgLoaded', imgLoaded);
    // console.log('pokemonms', pokemons);
    // console.log('imgLoaded', setImgLoaded);
    
    const handleImgLoad = () => {
        setImgLoaded(true);
    };

    return (
        <>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>

        {!imgLoaded || pokemons.length <= 0 && Array.from({ length: 10 }).map((_, idx) => (
            <CardSkeleton key={idx}/>
        ))}
            
            {pokemons.map((pokemon) => {
                const currentPokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon;
                
                    return (
                        <Card 
                        key={currentPokemon.id} 
                        img={currentPokemon.sprites?.other['official-artwork']?.front_default}
                        name={currentPokemon.name}
                        rank={currentPokemon.id}
                        types={currentPokemon.types}
                        openModal={openModal}
                        pokemon={pokemon}
                        handleImgLoad={handleImgLoad}
                        />
                    )
                })}
            
            {(loading || scrollLoading || searching || !imgLoaded) ? Array.from({ length: 12 }).map((_, idx) => (
                <CardSkeleton key={idx}/>
            )) : <CardSkeleton />
            }

            {selectedPokemon && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                  <PokemonDetail closeModal={closeModal} pokemon={selectedPokemon}/>
              </div>
            )}

          </div>
          <div ref={ref}></div>
        </>
    )
};