import { BtnSetTheme } from "../theme/BtnSetTheme"

export const Layout = ({ children }) => {
    return (
        <div className="flex flex-col text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <header className="flex items-center justify-between p-4 border-b-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                    <p className="font-bold text-2xl text-zinc-600 dark:text-zinc-300">Funcionalidad Tecnológica</p>
                </div>
                <BtnSetTheme />
            </header>

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}