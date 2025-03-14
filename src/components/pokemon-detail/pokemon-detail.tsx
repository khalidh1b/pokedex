import { useState } from "react";
import { ArrowLeft, Flame } from "lucide-react";

export const PokemonDetail = ({ closeModal }) => {
    const [activeTab, setActiveTab] = useState('about');

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
            <div className="w-full max-w-md rounded-3xl overflow-hidden bg-white shadow-lg">
                <PokemonDetailHeader closeModal={closeModal}/>
                <div className="bg-white rounded-t-3xl -mt-6 relative z-10">
                    <TabLists 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />
                    <TabContent activeTab={activeTab}/>
                </div>
            </div>
        </div>
    )
};

const PokemonDetailHeader = ({ closeModal }) => {
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/details-72PCZpil1f5y4FoezXEhwIengJVD23.png"
                  alt="Charmeleon"
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>

            <div className="ml-2 text-white">
                <p className="text-lg font-medium">#005</p>
                <h1 className="text-4xl font-bold mb-2">Charmeleon</h1>
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

const TabContent = ({ activeTab }) => {
    return (
        <div className="p-6 pt-4">
            {activeTab === "about" && (
              <div className="space-y-4">
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Species</span>
                  <span>Fire</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Height</span>
                  <span>110cm</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Weight</span>
                  <span>19kg</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium text-gray-600">Abilities</span>
                  <span>Blaze, Solar Power</span>
                </div>
              </div>
            )}

            {activeTab === "base-stats" && (
              <div className="text-center text-gray-500">Base stats content would go here</div>
            )}

            {activeTab === "evolution" && (
              <div className="text-center text-gray-500">Evolution content would go here</div>
            )}
        </div>
    )
};

const TabLists = ({ activeTab, setActiveTab }) => {
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