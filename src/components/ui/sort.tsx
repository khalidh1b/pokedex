import React from "react";

interface SortProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    sortBy: string;
};

export const Sort: React.FC<SortProps> = ({ setSortBy, sortBy }) => {
    
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    };
    
    return (
        <select 
            className="bg-white px-4 py-1 cursor-pointer focus:outline-none border-gray-300 border-2 rounded-md text-[#212121] font-medium"
            onChange={handleSortChange}
            value={sortBy}
            >
            <option value="id-asc">Lowest Number First</option>
            <option value="id-desc">Highest Number First</option>
            <option value="id-asc-alpha">Alphabetically (A-Z)</option>
            <option value="id-desc-alpha">Alphabetically (Z-A)</option>
        </select>
    )
};