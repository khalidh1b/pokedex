import { Pokebol } from '@/components/ui/pokebol';
import { getColorType } from '@/utils/getColorType';
import { getBgColorType } from '@/utils/getBgColorType';
import { capitalizedText } from '@/utils/capitalizedText';
import React from 'react';
import { Image } from '@/components/common/image';

interface CardProps {
    img: string;
    name: string;
    rank: number;
    types: { type: { name: string } }[]; 
    openModal: (pokemon: any) => void;
    pokemon: object;
};

export const Card: React.FC<CardProps> = ({ 
    img, 
    name, 
    rank, 
    types, 
    openModal, 
    pokemon, 
}) => {
    return (
        <div className={`${types?.[0]?.type.name && getBgColorType(types[0]?.type.name)} bg-[#1EBA11] mt-24 h-72  relative rounded-lg`}
        onClick={() => openModal(pokemon)}
        >
            <Image 
                src={img} 
                className='w-60 ml-10 absolute -top-28' 
                alt={name}
            />
            <div className='absolute top-40 pl-9'>
                <h3 className='text-white text-2xl font-semibold'>{capitalizedText(name || '')}</h3>
                <p className='text-white'>#{rank}</p>
                <div className="flex pt-2 gap-1 text-[#212121] font-medium">
                    {types?.map((t, index) => (
                        <span key={index} className={`${getColorType(t.type.name)} py-0.5 px-3 rounded-3xl`}>{t.type.name}</span>
                    ))}
                </div>
            </div>
            <div className='absolute bottom-0'>
                <Pokebol/>
            </div>
        </div>
    )
};