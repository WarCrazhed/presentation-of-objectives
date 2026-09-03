import { BtnSetTheme } from "../theme/BtnSetTheme"
import { LogoMark } from "../icons"

export const Layout = ({ children, counter }) => {
    return (
        <div className="flex min-h-screen flex-col bg-canvas text-ink">
            <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-line bg-panel px-4 py-2.5 sm:px-7">
                <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-7 items-center justify-center rounded-md bg-accent text-accent-ink">
                        <LogoMark className="size-4" />
                    </span>
                    <p className="text-sm font-semibold tracking-tight">Funcionalidad Tecnológica</p>
                    <span className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
                        Humana11
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {counter && (
                        <span className="num rounded-md border border-line px-2.5 py-1 text-[11px] text-muted">
                            {counter}
                        </span>
                    )}
                    <BtnSetTheme />
                </div>
            </header>

            <main className="dot-grid flex-1 pb-20">
                {children}
            </main>
        </div>
    )
}
