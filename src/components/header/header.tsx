import { PokedexLogo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import React, { useState } from 'react';

export const Header = () => {
    const { handleSearch } = useSearchPokemon();
    const [searchQuery, setSearchQuery] = useState('');
    
    // handleSearch('query')
    const pokemonSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };
    console.log(searchQuery);

    return (
        <header>
            <PokedexLogo/>
            <div className='relative mt-7 mb-20'>
                <form onSubmit={pokemonSearch}>
                    <Search className='absolute left-3 top-2.5 text-[#416EDF]'/>
                    <Input
                        type="text" 
                        className="w-full py-3 px-2 rounded-lg focus:outline-[#416EDF] shadow-md placeholder:text-[#416EDF] drop-shadow-xl pl-12 text-[#416EDF]" 
                        placeholder='Pokemon name, number or type'
                        style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)'}}
                        onchange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                        content='Search' 
                        type='submit' 
                        className='bg-[#FFCE31] absolute top-1.5 right-2 text-[#416EDF] px-10 rounded-md cursor-pointer font-medium text-sm py-2' 
                        onclick={() => pokemonSearch}
                    />
                </form>
            </div>
        </header>
    )
};