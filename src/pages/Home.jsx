import { QRCodeSVG } from 'qrcode.react';
import { platforms } from '../data/platforms';
import { strategicObjectives } from '../data/objectives';
import { tareasIA } from '../data/aiTasks';

export const Home = () => {
    // Las cifras salen de las mismas fuentes que los slides, para que nunca se contradigan.
    const totalIniciativas = strategicObjectives.reduce((acc, o) => acc + o.initiatives.length, 0);
    const totalRegistros = platforms.reduce((acc, p) => acc + p.records.length, 0);
    const horasAhorradas = tareasIA.reduce((acc, t) => acc + (t.manualHoras - t.iaHoras), 0);

    const resumen = [
        { value: strategicObjectives.length, label: 'objetivos' },
        { value: totalIniciativas, label: 'iniciativas' },
        { value: totalRegistros, label: 'registros' },
        { value: `${horasAhorradas} h`, label: 'ahorradas con IA', accent: true }
    ];

    return (
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center gap-12 px-4 py-16 sm:px-7 lg:flex-row lg:justify-between lg:gap-16">
            <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 font-mono text-[11px] text-muted">
                    <span className="size-1.5 rounded-full bg-accent" />
                    ene – dic 2026
                </span>

                <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    Funcionalidad<br />Tecnológica <span className="text-accent">2026</span>
                </h1>

                <p className="max-w-md text-base leading-relaxed text-muted text-pretty">
                    Informe de objetivos, avances, operación y costos del área. Cinco plataformas,
                    ocho objetivos estratégicos, un equipo.
                </p>

                <div className="flex items-center gap-3.5">
                    <span className="size-10 rounded-full border border-line bg-panel-2" />
                    <div className="text-left">
                        <p className="text-sm font-medium">José Mario Zamora</p>
                        <p className="font-mono text-[11px] text-dim">Responsable del área</p>
                    </div>
                </div>

                <div className="mt-2 grid w-full grid-cols-2 overflow-hidden rounded-lg border border-line bg-panel sm:grid-cols-4">
                    {resumen.map((item) => (
                        <div key={item.label} className="flex flex-col gap-1 border-b border-line px-5 py-3.5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                            <p className={`num text-xl font-medium ${item.accent ? 'text-accent' : 'text-ink'}`}>{item.value}</p>
                            <p className="text-[11px] text-dim">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 rounded-xl border border-line bg-panel p-4">
                <div className="rounded bg-white p-3">
                    <QRCodeSVG
                        value="https://presentation-of-objectives.netlify.app/"
                        size={176}
                        bgColor={"#ffffff"}
                        fgColor={"#14181a"}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">Escanear para abrir</p>
            </div>
        </div>
    )
}
