export const getBgColorType = (type: string): string => {
    const typeColors: { [key: string]: string } = {
        grass: "bg-[#1EBA11]",
        poison: "bg-[#7E00CB]",
        fire: "bg-[#EB6C6C]",
        water: "bg-[#009ACB]",
        electric: "bg-[#B7B117]",
        flying: "bg-[#2299EE]",
        bug: "bg-[#91AC22]",
        normal: "bg-[#B6B6B6]",
        ground: "bg-[#A77437]",
        fairy: "bg-[#C01A8D]",
        fighting: "bg-[#BA114E]",
        psychic: "bg-[#C4484A]",
        rock: "bg-[#857D57]",
        steel: "bg-[#448F85]",
        ghost: "bg-[#6B2BF1]",
        ice: "bg-[#3A9D90]",
        dragon: "bg-[#1268B8]",
        dark: "bg-[#373737]",
    }
    
    return typeColors[type];
};