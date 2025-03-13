import { FilterIcon, PanelRightCloseIcon } from 'lucide-react';
import { useState } from 'react';

export const Filter = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const toggleFilter = () => setFilterOpen(!filterOpen);

    return (
        <div>
            <div 
                className='flex gap-2 bg-white cursor-pointer border-gray-300 border-2 px-4 py-1 rounded-3xl' 
                onClick={toggleFilter}
            >
                <FilterIcon className='w-6'/>
                <h2 className='text-[#212121] text-base font-medium'>Filters</h2>
            </div>
            <FilterPanel isOpen={filterOpen} onClose={toggleFilter} />
        </div>
    );
};

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
};

const FilterPanel = ({ isOpen, onClose }: FilterPanelProps) => {
    const types = [
        "Normal", "Fighting", "Flying", "Poison", "Ground", "Steel", "Fire", "Water", "Grass",
        "Dragon", "Dark", "Fairy", "Electric", "Rock", "Bug", "Ghost", "Psychic", "Ice"
    ];

    return (
        <div 
            className={`fixed top-0 right-0 h-full w-80 z-50 bg-[#F5F7FB] shadow-lg transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300`}
        >
            <div className='flex items-center justify-between mx-3 my-4'>
                <h3 className='text-xl font-semibold text-[#212121]'>Filters</h3>
                <PanelRightCloseIcon className='cursor-pointer' onClick={onClose}/>
            </div>
            
            <hr className='border-t-slate-300 mb-4'/>
            <span className='pl-3'>Type</span>
            <TypeCheckboxes types={types} />
            <div className='flex absolute gap-10 ml-4 bottom-7 justify-center'>
                <button className='py-1.5 cursor-pointer font-medium border-1 text-[#416EDF] border-[#416EDF] px-3 rounded-md'>
                    Reset Filters
                </button>
                <button className='bg-[#C9D2EA] cursor-pointer py-1.5 font-medium text-[#416EDF] px-3 rounded-md'>
                    Apply Filter
                </button>
            </div>

        </div>
    );
};


interface TypeCheckboxesProps {
    types: string[];
};

const TypeCheckboxes = ({ types }: TypeCheckboxesProps) => {
    return (
        <div className='flex justify-between px-3 text-[#212121] text-base font-medium'>
            {types.map((type, index) => (
                <div key={type} className={`grid ${index >= types.length / 2 ? 'ml-4' : ''}`}>
                    <div className='flex gap-2 items-center'>
                        <input type="checkbox"/>
                        <span>{type}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
