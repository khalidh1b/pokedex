import { Card } from '@/components/ui/card';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { usePokemonContext } from '@/hooks/usePokemonContext';
import useInfiniteScrolling from '@/hooks/useInfiniteScrolling';
import { useCallback, useEffect, useState } from 'react';
import { PokemonDetail } from '@/components/pokemon-detail/pokemon-detail';
import useFetchPokemon from '@/hooks/useFetchPokemon';
import { Pokemon } from '@/types/pokemon';

export const Main = () => {
    const { pokemons, loading } = usePokemonContext();
    const { ref, scrollLoading } = useInfiniteScrolling();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const fetchPokemon = useFetchPokemon();

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    const openModal = useCallback((pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedPokemon(null);
    }, []);

    return (
        <>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
            
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
                        />
                    )
                })}
            {
                loading || scrollLoading && <CardSkeleton/>
            }

            {selectedPokemon && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                  <PokemonDetail closeModal={closeModal} pokemon={selectedPokemon}/>
              </div>
            )}

          </div>
          <div ref={ref} />
        </>
    )
};