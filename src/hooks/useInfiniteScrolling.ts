import { usePokemonContext } from "@/context/pokemonContext";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from 'react-intersection-observer';

const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

const useInfiniteScrolling = () => {
    const { setPokemons } = usePokemonContext();
    const [nextUrl, setNextUrl] = useState<string | null>(API);
    const { ref, inView } = useInView();
    const [scrollLoading, setScrollLoading] = useState(false);

    const fetchPokemons = useCallback(async () => {
        try {
            setScrollLoading(true);
            // console.log('nexturl', nextUrl);
            if(!nextUrl) return;
            const resp = await fetch(nextUrl);
            const data = await resp.json();
            // console.log('data scrolling', data);
            
            const detailedPokemonPromises = data.results.map(async (pokemon: any) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
            const detailedPokemons = await Promise.all(detailedPokemonPromises);
            // console.log(detailedPokemons);
            
            setPokemons((prev) => {
                const newPokemon = detailedPokemons.filter(
                    (p) => !prev.some((existing) => existing.id === p.id)
                );
                return [...prev, ...newPokemon];
            });
            
            setNextUrl(data.next);
        } catch (error) {
            // console.error('failed to fetch pokemmons', error);
            const err = error as Error;
            toast.error(err?.message || 'An unknowed error occured, please try again!')
        } finally {
            setScrollLoading(false);
        }
    }, [nextUrl, scrollLoading])

    useEffect(() => {
        if(inView) {
            fetchPokemons();
        } 
    }, [inView]);

    return { ref, scrollLoading }
};

export default useInfiniteScrolling;