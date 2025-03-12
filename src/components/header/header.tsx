import { PokedexLogo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const Header = () => {
    return (
        <header>
            <PokedexLogo/>
            <div className='relative mt-7 mb-20'>
                <form onSubmit={() => {}}>
                    <Search className='absolute left-3 top-2.5 text-[#416EDF]'/>
                    <Input
                        type="text" 
                        className="w-full py-3 px-2 rounded-lg focus:outline-[#416EDF] shadow-md placeholder:text-[#416EDF] drop-shadow-xl pl-12 text-[#416EDF]" 
                        placeholder='Pokemon name, number or type'
                        style={{ boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)'}}
                    />
                    <Button 
                        content='Search' 
                        type='submit' 
                        className='bg-[#FFCE31] absolute top-1.5 right-2 text-[#416EDF] px-10 rounded-md font-medium text-sm py-2' 
                        onclick={() => {}}
                    />
                </form>
            </div>
        </header>
    )
};