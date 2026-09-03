import { useContext } from "react";
import { Moon } from "./Moon";
import { Sun } from "./Sun";
import { ThemeContext } from "../../context/ThemeContext";

// Muestra el icono del tema al que se va a cambiar, no el actual.
export const BtnSetTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            className="inline-flex size-8 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent"
        >
            {isDark ? <Sun /> : <Moon />}
        </button>
    );
};
