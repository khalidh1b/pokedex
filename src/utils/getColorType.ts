
export const getColorType = (type: string): string => {
    const typeColors: { [key: string]: string } = {
        grass: "bg-[#80E177]",
        poison: "bg-[#D89CFD]",
        fire: "bg-[#FF6464]",
        water: "bg-[#9FF3FF]",
        electric: "bg-[#FFFA86]",
        flying: "bg-[#CBE9FF]",
        bug: "bg-[#C9FF84]",
        normal: "bg-[#CBCBCB]",
        ground: "bg-[#FFBF72]",
        fairy: "bg-[#FFA2E3]",
        fighting: "bg-[#FF699F]",
        psychic: "bg-[#FF5E60]",
        rock: "bg-[#CFC06F]",
        steel: "bg-[#A4FFE9]",
        ghost: "bg-[#B592FF]",
        ice: "bg-[#AEFFF4]",
        dragon: "bg-[#87C5FF]",
        dark: "bg-[#8F8F8F]",
    }
    
    return typeColors[type];
};