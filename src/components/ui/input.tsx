import React from "react";

interface InputProps {
    type: string,
    className: string,
    placeholder: string,
    onchange?: (e: any) => void,
    style?: object
};

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