import { Fragment, useState } from 'react';
import { ChevronDown } from '../components/icons';
import { tareasIA } from '../data/aiTasks';
import { FootNote, SearchField, SlideHeader, Stat, StatStrip } from '../components/ui';

// Un tono por categoría, tomado de los tokens de src/index.css (claro y oscuro).
const CAT_TONE = {
    "Seguridad": "text-cat-sec",
    "Infraestructura": "text-cat-ux",
    "Deuda Técnica": "text-cat-debt",
    "Frontend / UX": "text-cat-ux",
    "IA / Chatbot": "text-cat-ia",
    "Calidad": "text-cat-qa",
    "Funcionalidad": "text-cat-func",
    "Base de Datos": "text-cat-db",
};

const CatChip = ({ cat }) => (
    <span className={`inline-flex whitespace-nowrap rounded border border-current/25 bg-current/10 px-2 py-0.5 text-[10px] ${CAT_TONE[cat] ?? 'text-muted'}`}>
        <span className="text-ink/85">{cat}</span>
    </span>
);

export const AIUsage = () => {
    const [query, setQuery] = useState('');

    const totalManual = tareasIA.reduce((acc, t) => acc + t.manualHoras, 0);
    const totalIA = tareasIA.reduce((acc, t) => acc + t.iaHoras, 0);
    const totalAhorro = totalManual - totalIA;
    const ahorroPct = Math.round((totalAhorro / totalManual) * 100);

    // Filtrado por búsqueda (tarea, plataforma o categoría).
    const q = query.trim().toLowerCase();
    const tareasFiltradas = q
        ? tareasIA.filter((t) => `${t.tarea} ${t.plataforma} ${t.cat}`.toLowerCase().includes(q))
        : tareasIA;

    // Agrupar por plataforma preservando orden de aparición.
    const plataformas = [...new Set(tareasFiltradas.map((t) => t.plataforma))];
    const grupos = plataformas.map((p) => ({
        plataforma: p,
        items: tareasFiltradas.filter((t) => t.plataforma === p),
    }));

    // Totales del pie de tabla reflejan lo visible (filtrado).
    const footManual = tareasFiltradas.reduce((acc, t) => acc + t.manualHoras, 0);
    const footIA = tareasFiltradas.reduce((acc, t) => acc + t.iaHoras, 0);
    const footAhorro = footManual - footIA;
    const footPct = footManual ? Math.round((footAhorro / footManual) * 100) : 0;

    // Barras de magnitud, un solo tono: la pista es el costo manual, el relleno las horas con IA.
    const resumenPlataformas = [...new Set(tareasIA.map((t) => t.plataforma))]
        .map((p) => {
            const items = tareasIA.filter((t) => t.plataforma === p);
            const manual = items.reduce((acc, t) => acc + t.manualHoras, 0);
            const ia = items.reduce((acc, t) => acc + t.iaHoras, 0);
            return { plataforma: p, n: items.length, manual, ia, pct: Math.round((manual - ia) / manual * 100) };
        })
        .sort((a, b) => b.manual - a.manual);
    const maxManual = Math.max(...resumenPlataformas.map((p) => p.manual));

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="05"
                eyebrow="inteligencia artificial"
                title="Uso de IA en el área"
                description="Tareas desarrolladas con apoyo de IA durante julio y agosto, y el tiempo que representaron frente al trabajo manual."
            >
                <SearchField value={query} onChange={setQuery} placeholder="Buscar tarea, plataforma o categoría…" />
            </SlideHeader>

            {/* Cifra protagonista */}
            <StatStrip className="grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2 bg-panel px-5 py-5 max-lg:col-span-2">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-dim">Horas ahorradas</p>
                    <p className="flex items-baseline gap-3">
                        <span className="num text-4xl font-medium tracking-tight text-accent">{totalAhorro} h</span>
                        <span className="num text-sm text-muted">−{ahorroPct}%</span>
                    </p>
                    <p className="text-xs text-dim">
                        <span className="num">{totalManual} h</span> estimadas en manual · <span className="num">{totalIA} h</span> con apoyo de IA
                    </p>
                </div>
                <Stat label="Tareas" value={tareasIA.length} />
                <Stat label="Plataformas" value={resumenPlataformas.length} />
                <Stat label="Equivale a" value={`${Math.round(totalAhorro / 8)} días`} hint="1 día = 8 h" />
            </StatStrip>

            {/* Horas por plataforma */}
            <div className="flex flex-col gap-4 rounded-lg border border-line bg-panel p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="text-sm font-semibold">Horas por plataforma</h2>
                    <div className="flex items-center gap-3.5 text-[11px] text-dim">
                        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3.5 rounded-[2px] bg-line" />estimado manual</span>
                        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3.5 rounded-[2px] bg-accent" />con apoyo de IA</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5">
                    {resumenPlataformas.map((p) => (
                        <div key={p.plataforma} className="grid grid-cols-[9rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr_11rem]">
                            <div className="flex items-baseline gap-2 truncate">
                                <span className="truncate text-xs">{p.plataforma}</span>
                                <span className="num text-[10px] text-faint">{p.n}</span>
                            </div>
                            <div className="relative h-3">
                                <div className="h-3 min-w-[3px] rounded-[3px] bg-line" style={{ width: `${p.manual / maxManual * 100}%` }} />
                                <div className="absolute left-0 top-0 h-3 min-w-[3px] rounded-[3px] bg-accent" style={{ width: `${p.ia / maxManual * 100}%` }} />
                            </div>
                            <div className="num flex items-baseline gap-2.5 text-[11px] max-sm:col-span-2 max-sm:justify-end">
                                <span className="text-muted">{p.manual} h</span>
                                <span className="text-faint">→</span>
                                <span className="text-accent">{p.ia} h</span>
                                <span className="text-dim">−{p.pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detalle */}
            <div className="overflow-x-auto rounded-lg border border-line bg-panel">
                <table className="w-full min-w-[1000px] border-collapse">
                    <thead>
                        <tr className="bg-panel-2 font-mono text-[10px] uppercase tracking-wide text-dim">
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-4 py-2 text-left font-normal">Tarea</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Plataforma</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Categoría</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Manual</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Con IA</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Ahorro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-sm text-dim">
                                    No se encontraron resultados para «{query}».
                                </td>
                            </tr>
                        )}
                        {grupos.map((grupo) => (
                            <Fragment key={grupo.plataforma}>
                                <tr className="bg-panel-2">
                                    <td className="border-y border-line px-4 py-2" colSpan={6}>
                                        <span className="text-xs font-semibold">{grupo.plataforma}</span>
                                        <span className="num ml-2 text-[11px] text-dim">{grupo.items.length}</span>
                                    </td>
                                </tr>
                                {grupo.items.map((item, i) => {
                                    const ahorro = item.manualHoras - item.iaHoras;
                                    const pct = Math.round((ahorro / item.manualHoras) * 100);
                                    return (
                                        <tr key={`${grupo.plataforma}-${i}`} className="border-b border-line-soft transition-colors hover:bg-panel-2">
                                            <td className="py-1.5 pl-7 pr-4 text-xs">{item.tarea}</td>
                                            <td className="whitespace-nowrap px-2 py-1.5 text-xs text-muted">{item.plataforma}</td>
                                            <td className="px-2 py-1.5"><CatChip cat={item.cat} /></td>
                                            <td className="num whitespace-nowrap px-2 py-1.5 text-[11px] text-muted">{item.manualHoras} h</td>
                                            <td className="num whitespace-nowrap px-2 py-1.5 text-[11px]">{item.iaHoras} h</td>
                                            <td className="num whitespace-nowrap px-2 py-1.5 text-[11px] text-accent">−{ahorro} h · {pct}%</td>
                                        </tr>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-panel-2">
                            <td className="border-t border-line px-4 py-2.5 text-xs font-semibold" colSpan={3}>
                                {q ? 'Total (filtrado)' : 'Total'}
                            </td>
                            <td className="num whitespace-nowrap border-t border-line px-2 py-2.5 text-xs text-muted">{footManual} h</td>
                            <td className="num whitespace-nowrap border-t border-line px-2 py-2.5 text-xs">{footIA} h</td>
                            <td className="num whitespace-nowrap border-t border-line px-2 py-2.5 text-xs text-accent">−{footAhorro} h · {footPct}%</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Justificación / mejora del flujo de trabajo */}
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-panel p-5">
                <h2 className="text-sm font-semibold">Mejora en el flujo de trabajo</h2>
                <p className="text-xs leading-relaxed text-muted">
                    El apoyo de IA permitió al área atender en dos meses <span className="num">{tareasIA.length}</span> tareas
                    en <span className="num">{resumenPlataformas.length}</span> plataformas del ecosistema, cubriendo seguridad,
                    funcionalidades nuevas, experiencia de usuario, deuda técnica y capacidades con IA.
                </p>
                <ul className="flex flex-col gap-2 text-xs leading-relaxed text-muted">
                    {[
                        'Seguridad reforzada: FormRequests, API Resources, rate limit de contraseñas, protección contra inyección por payload, captcha, 2FA y «recordar dispositivo» replicados en las plataformas.',
                        'Diagnósticos ampliados: NOM-035 y Cultura refactorizados, evaluación 360° en Excel, y diagnósticos con plantillas y NPS integrados a Talento.',
                        'Capacidades con IA: chatbot Humi con opciones fijas y con IA, e informes/reportes 360° generados automáticamente.',
                        'Experiencia y calidad: onboarding tours con Driver.js, optimización de imágenes y accesibilidad (SEO) en el frontend, migración a TypeScript 7 y estándares con pruebas de código.'
                    ].map((punto) => (
                        <li key={punto} className="flex gap-2.5">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                            {punto}
                        </li>
                    ))}
                </ul>
            </div>

            <FootNote>estimaciones comparativas manual vs. asistido con IA · 1 día = 8 h</FootNote>
        </div>
    );
};
