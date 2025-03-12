import React from "react";

interface ButtonProps {
    content: string,
    className: string,
    type: 'submit' | 'reset' | 'button',
    onclick: () => void
};

export const Button: React.FC<ButtonProps> = ({ content, className, type, onclick }) => {
    return (
        <button type={type} className={`${className}`} onClick={onclick}>{content}</button>
    )
};