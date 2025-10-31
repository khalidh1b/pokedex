import { ChangeEvent } from "react";
import { Pokemon } from "./pokemon";

export interface InputProps {
    type: string,
    className: string,
    placeholder: string,
    onchange?: (e: ChangeEvent<HTMLInputElement>) => void,
    style?: object
};

export interface ButtonProps {
    content: string,
    className: string,
    type: 'submit' | 'reset' | 'button',
    onclick: () => void
};

export interface CardProps {
    img: string;
    name: string;
    rank: number;
    types?: { type: { name: string } }[]; 
    openModal: (pokemon: Pokemon) => void;
    pokemon: Pokemon;
};

export interface TypeCheckboxesProp {
    filterTypes: string[];
    onChange: (string: string) => void;
};

export interface SortProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    sortBy: string;
};

export interface ThemeProps {
    theme: boolean; 
    handleThemeChange: () => void; 
};