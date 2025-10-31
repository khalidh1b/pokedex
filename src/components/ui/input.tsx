import React from "react";
import { InputProps } from "@/types/ui-components";

export const Input: React.FC<InputProps> = ({ type, className, placeholder, onchange, style }) => {
    return (
        <input 
            type={type} 
            className={`${className}`} 
            placeholder={placeholder}
            onChange={onchange}
            style={style}
        />
    )
};