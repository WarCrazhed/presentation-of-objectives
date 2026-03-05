import { useContext } from "react";
import { Moon } from "./Moon";
import { Sun } from "./Sun";
import { ThemeContext } from "../../context/ThemeContext";

export const BtnSetTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button
            className="relative inline-flex group"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <div className="flex justify-between items-center gap-3 bg-white dark:bg-zinc-900 rounded-full border border-zinc-50 dark:border-zinc-900 p-1">
                <Sun />
                <Moon />
            </div>
        </button>
    );
};
