import React, { useState } from "react";
import { ArrowLeft, Flame } from "lucide-react";

type PokemonDetailProps = {
  closeModal: () => void;
  pokemon: any; 
};

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ closeModal, pokemon }) => {
    const [activeTab, setActiveTab] = useState('about');

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
            <div className="w-full max-w-md rounded-3xl overflow-hidden bg-white shadow-lg">
                <PokemonDetailHeader 
                  closeModal={closeModal} 
                  name={pokemon.name}
                  order={pokemon.order}
                  image={pokemon.sprites?.other['official-artwork']?.front_default}
                />
                <div className="bg-white rounded-t-3xl -mt-6 relative z-10">
                    <TabLists 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                    <TabContent 
                      activeTab={activeTab} 
                      height={pokemon.height} 
                      weight={pokemon.weight} 
                      stats={pokemon.stats} 
                      abilities={pokemon.abilities}
                    />
                </div>
            </div>
        </div>
    )
};

type PokemonDetailHeaderProp = {
  closeModal: () => void;
  order: string;
  name: string;
  image: string
};


const PokemonDetailHeader: React.FC<PokemonDetailHeaderProp> = ({ 
    closeModal, 
    order, 
    name, 
    image 
}) => {
    return (
        <div className="relative bg-[#fa7a7a] pt-4 pb-16">

          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#fc8c8c] opacity-30 -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#fc8c8c] opacity-30 -mr-10 mb-10"></div>

          <div className="px-6">
            <button 
                onClick={() => closeModal()} 
                className="text-white cursor-pointer p-2"
            >
                <ArrowLeft size={24} />
            </button>

            <div className="flex items-start mt-2">

              <div className="w-32 h-32 relative">
                <img
                  src={image}
                  alt="Charmeleon"
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>

            <div className="ml-2 text-white">
                <p className="text-lg font-medium">#{order}</p>
                <h1 className="text-4xl font-bold mb-2">{name}</h1>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff7b00] bg-opacity-30">
                  <Flame size={16} className="mr-1" />
                  <span className="text-sm">Fire</span>
                </div>
            </div>
            </div>
          </div>
        </div>
    )
};

type TabContentProp = {
  activeTab: string;
  weight: string;
  height: string;
  stats: any;
  abilities: any 
};

const TabContent: React.FC<TabContentProp> = ({ 
  activeTab, 
  weight, 
  height, 
  stats, 
  abilities 
}) => {
    // console.log(stats);
    console.log(abilities);
    return (
        <div className="p-6 pt-4">
            {activeTab === "about" && (
              <div className="space-y-4 text-[#212121]">
                <div className="flex">
                  <span className="w-24 font-medium">Species</span>
                  <span className="text-[#212121]">Fire</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium ">Height</span>
                  <span className="text-[#212121]">{height}cm</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium">Weight</span>
                  <span className="text-[#212121]">{weight}kg</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium">Abilities</span>
                  {abilities.map((ability: any, idx: number) => (
                  <span key={idx} className="text-[#212121] pr-2">{ability.ability.name}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "base-stats" && (
              stats.map((stat: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between mb-3">
                  <div className="flex justify-between w-4/6 text-[#212121] text-base font-medium mr-7">
                    <span>{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-300">
                    <div className="h-1 rounded-md bg-[#FF6464]" style={{width: `${parseInt(stat.base_stat)}%`}}></div>
                  </div>
                </div>
              ))
            )}

            {activeTab === "evolution" && (
              <div className="text-center text-gray-500">Evolution content would go here</div>
            )}
        </div>
    )
};

type TabListsProp = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>; 
};

const TabLists: React.FC<TabListsProp> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b">
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === "about" ? "border-b-2 border-[#fa7a7a] text-black font-medium" : "text-gray-500"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("base-stats")}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === "base-stats" ? "border-b-2 border-[#fa7a7a] text-black font-medium" : "text-gray-500"
              }`}
            >
              Base stats
            </button>
            <button
              onClick={() => setActiveTab("evolution")}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === "evolution" ? "border-b-2 border-[#fa7a7a] text-black font-medium" : "text-gray-500"
              }`}
            >
              Evolution
            </button>
        </div>
    )
};