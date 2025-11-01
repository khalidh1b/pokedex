import { Image } from '@/components/common/image';
import pokedexlogo from '/Pokedex-logo.png';

export const PokedexLogo = () => {
    return (
        <Image src={pokedexlogo} alt="Pokedex" className='w-52' width={208} height={77}/>
    )
};