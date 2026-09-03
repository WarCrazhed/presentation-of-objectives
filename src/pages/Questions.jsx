export const Questions = () => {
    return (
        <div className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-3xl flex-col items-center justify-center gap-8 px-4 py-16 text-center">
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    ¿Preguntas<span className="text-accent">?</span>
                </h1>
                <p className="text-base text-muted">Gracias por su atención.</p>
            </div>

            <span className="h-px w-16 bg-line" />

            <div className="flex items-center gap-8">
                <div className="flex flex-col gap-1">
                    <p className="font-mono text-xs text-muted">José Mario Zamora</p>
                    <p className="font-mono text-[11px] text-faint">Responsable del área</p>
                </div>
                <span className="h-8 w-px bg-line" />
                <div className="flex flex-col gap-1">
                    <p className="font-mono text-xs text-muted">humana11.com</p>
                    <p className="font-mono text-[11px] text-faint">Ecosistema Humana11</p>
                </div>
            </div>
        </div>
    )
}
