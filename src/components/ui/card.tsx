import { Pokebol } from '@/components/ui/pokebol';

export const Card = () => {
    return (
        <div className="bg-[#1EBA11] rounded-lg">
            <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1741765971/pokemon-img_bkmawy.png" className='absolute top-40 ml-10' alt="#" />
            <div className='relative top-24 pl-5'>
                <h3 className='text-white text-2xl font-semibold'>Bulbasaur</h3>
                <p className='text-white'>#001</p>
                <div className="flex pt-2 gap-1 text-[#212121] font-medium">
                    <span className="bg-[#6EE464] py-0.5 px-3 rounded-3xl">Grass</span>
                    <span className="bg-[#D89CFD] py-0.5 px-3 rounded-3xl">Poison</span>
                </div>
            </div>
            <Pokebol/>
        </div>
    )
};