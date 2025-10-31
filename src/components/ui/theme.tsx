import { ThemeProps } from "@/types/ui-components";
import { Sun, Moon } from "lucide-react";
import React from "react";

export const Theme: React.FC<ThemeProps> = ({ handleThemeChange, theme }) => {
    
    return (
        <div className="flex cursor-pointer" onClick={handleThemeChange}>
            {theme ? <Moon/> : <Sun/>}
        </div>
    )
};