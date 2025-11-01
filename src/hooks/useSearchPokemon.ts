import { toast } from 'react-hot-toast';
import { usePokemonContext } from "@/hooks/usePokemonContext";

export const useSearchPokemon = () => {
    const { setPokemons, setSearching } = usePokemonContext();

    const handleSearch = async (query: string) => {
        try {
            setSearching(true);

            const apiSearch = await searchPokemonApi(query);
            if(apiSearch == undefined) {
                toast.error('No Pokémon matched your search!')
                return;
            };

            const searchResults = [...apiSearch || []];
    
            // console.log('combinedSearchResults', searchResults);
            setPokemons([...searchResults]);

        } catch (error) {
            if(error instanceof Error) {
                // console.log(error);
                toast.error(error.message || 'An unknown error occured, please try again!');
            }
        } finally {
            setSearching(false);
        }
    };

    return { handleSearch };
};

interface Pokemon {
    name: string
    url: string
};

interface PokemonLists {
    pokemon: object
    slot: number
};

const searchPokemonApi = async (query: string) => {
    if(!query) return;
    const API = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    const typeAPI = `https://pokeapi.co/api/v2/type/${query.toLowerCase()}`;

    try {
        const res = await fetch(API);
        
        if(res.ok) {
            const data = await res.json();
            return [data];
        } 
        
        else if(!res.ok) {
            const typeResp = await fetch(typeAPI);
            if(typeResp.ok) {
                const typeData = await typeResp.json();
                const pokemonList = typeData.pokemon.map((p: PokemonLists) => p.pokemon);
                // console.log(pokemonList);
                
                const detailedPokemon = await Promise.all(
                    pokemonList.slice(0, 5).map(async (p: Pokemon) => {
                        const res = await fetch(p?.url);
                        const data = await res.json();
                        return [data];
                        // console.log('res', data)
                    })
                );
                
                // console.log(typeData);
                return detailedPokemon;
            }
        } 
    } catch (error) {
        // console.log("Error during API search:", error);
        const err = error as Error;
        toast.error(err.message || 'Error during API search, please try again!')
    }
};