import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.querySelector("html").classList.add('dark');
        } else {
            document.querySelector("html").classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
