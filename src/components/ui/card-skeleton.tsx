export const CardSkeleton = () => {
    return (
        <div className="bg-[#D3D4D8] h-72 mt-24 relative animate-pulse rounded-lg">
            <div className="w-44 h-40 ml-16 rounded-md absolute -top-12 bg-[#AAA]"></div>
            <div className='absolute top-40 pl-9'>
                <div className='w-24 h-8 rounded-3xl bg-[#AAA]'></div>
                <div className='w-10 h-5 rounded-2xl mt-2 bg-[#AAA]'></div>
                <div className="flex gap-3 mt-4">
                    <div className="w-20 h-8 rounded-3xl bg-[#AAA]"></div>
                    <div className="w-20 h-8 rounded-3xl bg-[#AAA]"></div>
                </div>
            </div>
        </div>
    )
};