export const Sort = () => {
    return (
        <select className="bg-white px-4 py-1 cursor-pointer focus:outline-none border-gray-300 border-2 rounded-md text-[#212121] font-medium">
            <option value="">Lowest Number First</option>
            <option value="">Highest Number First</option>
            <option value="">Alphabetically (A-Z)</option>
            <option value="">Alphabetically (Z-A)</option>
        </select>
    )
};