import { Fragment } from 'react';
import { platforms } from '../data/platforms';

export const PeriodActivity = () => {
    // Los números se derivan de platforms.js (misma fuente que "Uso de Plataformas")
    // para que ambos slides siempre cuadren. Solo registros relacionados con junio.
    const byName = (name) => platforms.find((p) => p.name === name)?.records ?? [];

    const talento = byName("Talento");
    const suitedo = byName("Suitedo");
    const uhe = byName("UHE");
    const web = byName("Página Web");

    const strip = (name) => name.includes("|") ? name.split("|").slice(1).join("|").trim() : name;

    const vacantes = talento.filter((r) => r.name.startsWith("Vacante"));
    const candidatos = talento.filter((r) => r.name.startsWith("Candidato"));
    const programas = uhe.filter((r) => r.name.startsWith("Programa"));
    const modulos = uhe.filter((r) => r.name.startsWith("Módulo"));
    const blogs = web;

    const kpis = [
        { label: "Candidatos (Talento)", value: candidatos.length, icon: "🧑‍💼" },
        { label: "Vacantes (Talento)", value: vacantes.length, icon: "📢" },
        { label: "Diagnósticos (SuiteDO)", value: suitedo.length, icon: "📊" },
        { label: "Programas (UHE)", value: programas.length, icon: "🎓" },
        { label: "Módulos (UHE)", value: modulos.length, icon: "📚" },
        { label: "Blogs (Humana11)", value: blogs.length, icon: "📝" },
    ];

    const lastUpdate = "2026-07-02 00:00:00";

    return (
        <div>
            <div className="flex flex-col bg-radial-[at_50%_75%] from-violet-50 via-zinc-100 to-fuchsia-50 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
                <div className="container m-auto p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-600 mb-4">
                        Actividad del Periodo
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-2">
                        Registros relacionados con junio 2026 en las plataformas del ecosistema.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                        Última actualización: {new Date(lastUpdate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    {/* Tarjetas KPI */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                        {kpis.map((kpi) => (
                            <div key={kpi.label} className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105">
                                <span className="text-3xl">{kpi.icon}</span>
                                <p className="text-4xl font-black text-violet-600 dark:text-violet-400 mt-2">{kpi.value}</p>
                                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-1">{kpi.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Detalle */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Programas y Módulos UHE */}
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-4">
                                🎓 Programas y módulos — UHE
                            </h2>
                            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                                {programas.map((p) => (
                                    <li key={p.name} className="flex items-start gap-2">
                                        <span className="text-violet-600 dark:text-violet-400 font-bold">▸</span>
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">Programa:</span> {strip(p.name)}
                                    </li>
                                ))}
                                {modulos.map((m) => (
                                    <li key={m.name} className="flex items-start gap-2">
                                        <span className="text-violet-600 dark:text-violet-400 font-bold">▸</span>
                                        {strip(m.name)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Blogs Humana11 */}
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-4">
                                📝 Blogs publicados — Humana11
                            </h2>
                            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                                {blogs.map((b, i) => (
                                    <Fragment key={i}>
                                        <li className="flex items-start gap-2">
                                            <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold">▸</span>
                                            <span>{strip(b.name)}</span>
                                        </li>
                                    </Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400 text-right">
                        Los conteos se derivan de la misma fuente que «Uso de Plataformas».
                    </div>
                </div>
            </div>
        </div>
    );
};
