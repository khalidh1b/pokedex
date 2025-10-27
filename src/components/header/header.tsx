import { PokedexLogo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sort } from '@/components/ui/sort';
import { Filter } from '@/components/ui/filter';
import { Loader, Search } from 'lucide-react';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import React, { useState } from 'react';
import { Theme } from '@/components/ui/theme';
import handleThemeToggle from '@/utils/handleThemeToggle';
import useHandleSorting from '@/hooks/useHandleSorting';
import { usePokemonContext } from '@/context/pokemonContext';

export const Header = () => {
    const { handleSearch } = useSearchPokemon();
    const [searchQuery, setSearchQuery] = useState('');
    const { handleThemeChange, theme } = handleThemeToggle();
    const { sortBy, setSortBy } = useHandleSorting();
    const { searching } = usePokemonContext();
    

    const pokemonSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };
    
    return (
        <header>
            <div className='flex select-none items-center justify-between'>
                <PokedexLogo/>
                <Theme handleThemeChange={handleThemeChange} theme={theme}/>
            </div>
            <div className='relative mt-7'>
                <form onSubmit={pokemonSearch}>
                    <Search className='absolute left-3 top-2.5 text-[#416EDF]'/>
                    <Input
                        type="text" 
                        className="w-full py-3 px-2 rounded-lg focus:outline-[#416EDF] shadow-md placeholder:text-[#416EDF] drop-shadow-xl pl-12 text-[#416EDF]" 
                        placeholder='Pokemon name, number or type'
                        style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)'}}
                        onchange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    {searching
                    ? <div className='bg-[#FFCE31] absolute bottom-1 right-2 text-[#416EDF] px-10 rounded-md cursor-pointer font-medium text-sm py-2'><Loader className='w-6 h-6 animate-spin'/></div>
                    : <Button 
                        content='Search' 
                        type='submit' 
                        className='bg-[#FFCE31] absolute top-1.5 right-2 text-[#416EDF] px-10 rounded-md cursor-pointer font-medium text-sm py-2' 
                        onclick={() => pokemonSearch}
                    /> 
                    }
                </form>
            </div>
            <div className='flex justify-between mb-20 mt-10'>
                <Sort 
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                />
                <Filter/>
            </div>
        </header>
    )
};