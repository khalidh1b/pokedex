import { toast } from 'react-hot-toast';
import { usePokemonContext } from "@/context/pokemonContext";

export const useSearchPokemon = () => {
    const { pokemons, setPokemon, setImgLoaded, searching, setSearching } = usePokemonContext();

    const handleSearch = async (query: string) => {
        try {
            setImgLoaded(false);
            setSearching(true);

            console.log('setsearching', searching, query)

            const localFiltered = pokemons.filter((pokemon) => {
                if (Array.isArray(pokemon)) {
                    return pokemon[0]?.name?.toLowerCase().includes(query?.toLowerCase());
                };
                
                return pokemon?.name?.toLowerCase().includes(query?.toLowerCase());
            });
    
            const apiSearch = await searchPokemonApi(query);
    
            const combinedSearchResults = [...localFiltered, ...apiSearch || []];
    
            console.log('combinedSearchResults', combinedSearchResults);
            setPokemon([...combinedSearchResults]);

        } catch (error) {
            if(error instanceof Error) {
                console.log(error);
                toast.error(error.message || 'An unknown error occured');
            }
        } finally {
            setSearching(false);
        }
    };

    return { handleSearch };
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
                const pokemonList = typeData.pokemon.map((p: any) => p.pokemon);
                // console.log(pokemonList);
                
                const detailedPokemon = await Promise.all(
                    pokemonList.slice(0, 5).map(async (p: any) => {
                        const res = await fetch(p.url);
                        const data = await res.json();
                        return [data];
                        // console.log('res', data)
                    })
                );
                
                console.log(typeData);
                return detailedPokemon;
            }
        } 
        else {
            toast.error('pokemon not found');
        }
    } catch (error) {
        console.log("Error during API search:", error);
        toast.error('Error during API search, please try again!')
    }
};