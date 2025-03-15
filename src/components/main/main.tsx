import { Card } from '@/components/ui/card';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/context/pokemonContext';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useState } from 'react';
import { PokemonDetail } from '@/components/pokemon-detail/pokemon-detail';

export const Main = () => {
    const { pokemons, loading, searching, imgLoaded, setImgLoaded } = usePokemonContext();
    const { ref, scrollLoading } = useInfiniteScrolling();
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const openModal = (pokemon: any) => {
        setSelectedPokemon(pokemon);
    };

    const closeModal = () => {
        console.log('close modal')
        setSelectedPokemon(null);
    };

    // console.log(loading, scrollLoading, searching)
    // console.log('imgLoaded', imgLoaded);
    // console.log('imgLoaded', setImgLoaded);
    
    const handleImgLoad = () => {
        // console.log('handleimgload caliing')
        setImgLoaded(true)
    };

    return (
        <>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
            
            {!imgLoaded && Array.from({ length: 10 }).map((_, idx) => (
                <CardSkeleton key={idx}/>
            ))}

            {(loading || scrollLoading || searching) ? Array.from({ length: 12 }).map((_, idx) => (
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
                            openModal={openModal}
                            pokemon={pokemon}
                            handleImgLoad={handleImgLoad}
                        />
                    )
                })
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