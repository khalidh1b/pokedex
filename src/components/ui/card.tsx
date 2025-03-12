import { Pokebol } from '@/components/ui/pokebol';
import { getColorType } from '@/utils/getColorType';

export const Card = ({ img, name, rank, types }) => {
    return (
        <div className="bg-[#1EBA11] mt-24 h-72  relative rounded-lg">
            <img 
                src={img} 
                className='w-60 ml-10 absolute -top-28' alt="#" 
            />
            <div className='absolute top-40 pl-9'>
                <h3 className='text-white text-2xl font-semibold'>{name}</h3>
                <p className='text-white'>#{rank}</p>
                <div className="flex pt-2 gap-1 text-[#212121] font-medium">
                    {types.map((t, index) => (
                        <span key={index} className={`${getColorType(t.type.name)} py-0.5 px-3 rounded-3xl`}>{t.type.name}</span>
                    ))}
                </div>
            </div>
            <Pokebol/>
        </div>
    )
};