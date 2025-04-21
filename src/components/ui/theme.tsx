import { Sun, Moon } from "lucide-react";
import React from "react";

interface ThemeProps {
    theme: boolean; 
    handleThemeChange: () => void; 
};

export const Theme: React.FC<ThemeProps> = ({ handleThemeChange, theme }) => {
    
    return (
        <div className="flex cursor-pointer" onClick={handleThemeChange}>
            {theme ? <Moon/> : <Sun/>}
        </div>
    )
};