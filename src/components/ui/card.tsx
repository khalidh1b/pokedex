import { Pokebol } from '@/components/ui/pokebol';
import { getColorType } from '@/utils/getColorType';
import { getBgColorType } from '@/utils/getBgColorType';
import { capitalizedText } from '@/utils/capitalizedText';
import React from 'react';

interface CardProps {
    img: string;
    name: string;
    rank: number;
    types: { type: { name: string } }[]; 
    setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Card: React.FC<CardProps> = ({ img, name, rank, types, setImgLoaded }) => {
    return (
        <div className={`${getBgColorType(types[0]?.type.name)} bg-[#1EBA11] mt-24 h-72  relative rounded-lg`}>
            <img 
                src={img} 
                className='w-60 ml-10 absolute -top-28' alt="#"
                onLoad={() => setImgLoaded(true)}
            />
            <div className='absolute top-40 pl-9'>
                <h3 className='text-white text-2xl font-semibold'>{capitalizedText(name)}</h3>
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