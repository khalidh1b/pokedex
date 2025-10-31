import React from "react";
import { ButtonProps } from "@/types/ui-components";

export const Button: React.FC<ButtonProps> = ({ content, className, type, onclick }) => {
    return (
        <button type={type} className={`${className}`} onClick={onclick}>{content}</button>
    )
};