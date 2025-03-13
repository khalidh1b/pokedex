import { FilterIcon, PanelRightCloseIcon } from 'lucide-react';
import { useState } from 'react';

export const Filter = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    return (
        <div>
            <div className='flex gap-2 bg-white cursor-pointer border-gray-300 border-2 px-4 py-1 rounded-3xl' onClick={() => setFilterOpen(true)}>
                <FilterIcon className='w-6'/>
                <h2 className='text-[#212121] text-base font-medium'>Filters</h2>
            </div>
            <div className={`fixed top-0 right-0 h-full w-80 z-50 bg-[#F5F7FB] shadow-lg transform ${filterOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                <div className='flex items-center justify-between mx-3 my-4'>
                    <h3 className='text-xl font-semibold text-[#212121]'>Filters</h3>
                    <PanelRightCloseIcon className='cursor-pointer' onClick={() => setFilterOpen(false)}/>
                </div>
                <hr className='border-t-slate-300 mb-4'/>
                <span className='pl-3'>Type</span>
                <TypeCheckboxes/>
                <div className='flex absolute gap-10 ml-4 bottom-7 justify-center'>
                    <button className='py-1.5 cursor-pointer font-medium border-1 text-[#416EDF] border-[#416EDF] px-3 rounded-md'>Reset Filters</button>
                    <button className='bg-[#C9D2EA] cursor-pointer py-1.5 font-medium text-[#416EDF] px-3 rounded-md'>Apply Filter</button>
                </div>
            </div>
        </div>
    )
};

const TypeCheckboxes = () => {
    return (
        <div className='flex justify-between px-3 text-[#212121] text-base font-medium'>
            <div className='grid'>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Normal</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Fighting</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Flying</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Poison</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Ground</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Steel</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Fire</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Water</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Grass</span>
                </div>
            </div>
            
            <div className='grid'>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Dragon</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Dark</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Fairy</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Electric</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Rock</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Bug</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Ghose</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Psychic</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox"/><span>Ice</span>
                </div>
            </div>
            
        </div>
    )
};