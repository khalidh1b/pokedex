import { useEffect, useState } from 'react';

const handleThemeToggle = () => {
    const [theme, setTheme] = useState<boolean>(() => {
        return localStorage.getItem("poketex-theme") === "dark";
    });

    const handleThemeChange = () => {
        setTheme(!theme);
        localStorage.setItem("poketex-theme", !theme ? "dark" : "light");
        // console.log(theme);
    };

    useEffect(() => {
        // console.log('calling')
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);

    return { handleThemeChange, theme };
};

export default handleThemeToggle;