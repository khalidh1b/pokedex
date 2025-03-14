import useHandleFilter from '@/hooks/useHandleFilter';
import { FilterIcon, PanelRightCloseIcon } from 'lucide-react';
import React from 'react';

export const Filter = () => {
    const { filterOpen, filterPokemons, filterTypes, handleCheckboxChange, resetFilter, setFilterOpen } = useHandleFilter();

    return (
        <div>
            <div className='flex gap-2 bg-white cursor-pointer border-gray-300 border-2 px-4 py-1 rounded-3xl' onClick={() => setFilterOpen(true)}>
                <FilterIcon className='w-6'/>
                <h2 className='text-[#212121] text-base font-medium'>Filters</h2>
            </div>
            <div className={`fixed top-0 right-0 h-full w-80 z-50 dark:bg-gray-600 bg-[#F5F7FB] shadow-lg transform ${filterOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                <div className='flex items-center justify-between mx-3 my-4'>
                    <h3 className='text-xl font-semibold dark:text-white text-[#212121]'>Filters</h3>
                    <PanelRightCloseIcon 
                        className='cursor-pointer' 
                        onClick={() => setFilterOpen(false)}
                    />
                </div>
                <hr className='border-t-slate-300 mb-4'/>
                <span className='pl-3 dark:text-white'>Type</span>
                <TypeCheckboxes 
                    filterTypes={filterTypes} 
                    onChange={handleCheckboxChange}
                />
                <div className='flex absolute gap-10 ml-4 bottom-7 justify-center'>
                    <button className='py-1.5 cursor-pointer font-medium border-1 text-[#416EDF] border-[#416EDF] px-3 rounded-md' onClick={() => resetFilter()}>Reset Filters</button>
                    <button className='bg-[#C9D2EA] cursor-pointer py-1.5 font-medium text-[#416EDF] px-3 rounded-md' onClick={() => filterPokemons(filterTypes)}>Apply Filter</button>
                </div>
            </div>
        </div>
    )
};

interface TypeCheckboxesProp {
    filterTypes: string[];
    onChange: (string: any) => void;
};

const TypeCheckboxes: React.FC<TypeCheckboxesProp> = ({ filterTypes, onChange }) => {
    const pokemonTypes = [
        "Normal", "Fighting", "Flying", "Poison", "Ground", "Steel", "Fire", "Water", "Grass",
        "Dragon", "Dark", "Fairy", "Electric", "Rock", "Bug", "Ghost", "Psychic", "Ice"
    ];
    return (
        <div className='grid grid-cols-2 justify-between px-3 dark:text-white text-[#212121] text-base font-medium'>
            {pokemonTypes.map((type, index) => (
                <div key={index} className='flex gap-2 mb-2 items-centers'>
                    <input 
                        type="checkbox"
                        checked={filterTypes.includes(type.toLowerCase())}
                        onChange={() => onChange(type.toLowerCase())}
                    />
                    <span>{type}</span>
                </div>
            ))}
        </div>
    )
};