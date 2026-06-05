import { Fragment } from 'react';

export const AIUsage = () => {
    const aiInitiatives = [
        {
            id: "IA1.0",
            name: "Migración de la página web a Astro",
            description: "Reconstrucción del sitio público con Astro y separación del panel administrativo de Laravel a su propio dominio.",
            proyectos: "humana11-frontend, humana11web",
            manualHoras: 120,
            iaHoras: 40,
            beneficio: "Mejor rendimiento (SSG), SEO y separación de responsabilidades web/admin."
        },
        {
            id: "IA2.0",
            name: "Eliminación de Sentinel",
            description: "Retiro de la librería Sentinel (en desuso) y reemplazo por el sistema de autenticación nativo en todos los proyectos.",
            proyectos: "SuiteDO, Humana11, Talento, UHE",
            manualHoras: 96,
            iaHoras: 28,
            beneficio: "Menos deuda técnica y dependencia abandonada; base de auth mantenible."
        },
        {
            id: "IA3.0",
            name: "Migración de npm a pnpm",
            description: "Cambio de gestor de paquetes de npm a pnpm por motivos de rendimiento y seguridad.",
            proyectos: "Todos los proyectos con frontend",
            manualHoras: 24,
            iaHoras: 6,
            beneficio: "Instalaciones más rápidas, menor uso de disco y lockfile más seguro."
        },
        {
            id: "IA4.0",
            name: "Implementación de MFA",
            description: "Autenticación multifactor (MFA) en el inicio de sesión de las plataformas.",
            proyectos: "SuiteDO, Humana11, Talento, UHE",
            manualHoras: 96,
            iaHoras: 32,
            beneficio: "Capa extra de seguridad contra accesos no autorizados."
        },
        {
            id: "IA5.0",
            name: "Carrito de compras EGAFI (Stripe)",
            description: "Carrito de compras para el programa formativo EGAFI integrando la API de pagos de Stripe.",
            proyectos: "EGAFI / UHE",
            manualHoras: 80,
            iaHoras: 28,
            beneficio: "Cobro en línea automatizado y conciliación de pagos del programa formativo."
        },
        {
            id: "IA6.0",
            name: "Bitácora de trazabilidad",
            description: "Bitácora de trazabilidad con spatie/laravel-activitylog para registrar acciones sobre los datos.",
            proyectos: "SuiteDO",
            manualHoras: 32,
            iaHoras: 8,
            beneficio: "Auditoría de cambios y trazabilidad de quién hizo qué y cuándo."
        },
        {
            id: "IA7.0",
            name: "Rate limit en inicios de sesión",
            description: "Límite de intentos (rate limiting) en el login para mitigar ataques de fuerza bruta.",
            proyectos: "SuiteDO, Humana11, Talento, UHE",
            manualHoras: 24,
            iaHoras: 6,
            beneficio: "Protección contra fuerza bruta y credential stuffing en el acceso."
        },
    ];

    const totalManual = aiInitiatives.reduce((acc, i) => acc + i.manualHoras, 0);
    const totalIA = aiInitiatives.reduce((acc, i) => acc + i.iaHoras, 0);
    const totalAhorro = totalManual - totalIA;
    const ahorroPct = Math.round((totalAhorro / totalManual) * 100);

    const lastUpdate = "2026-06-04 00:00:00";

    const fmtHoras = (h) => `${h} h (~${(h / 8).toFixed(1)} d)`;

    return (
        <div>
            <div className="flex flex-col bg-radial-[at_50%_75%] from-cyan-50 via-zinc-100 to-teal-50 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
                <div className="container m-auto p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-teal-600 mb-4">
                        Uso de IA
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-2">
                        Iniciativas del área de Funcionalidad Tecnológica apoyadas con Inteligencia Artificial y el tiempo de desarrollo que representó frente al trabajo manual.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                        Última actualización: {new Date(lastUpdate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    {/* Tarjetas resumen */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Estimado manual</p>
                            <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mt-1">{totalManual} h</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">~{(totalManual / 8).toFixed(0)} días de trabajo</p>
                        </div>
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Con apoyo de IA</p>
                            <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-1">{totalIA} h</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">~{(totalIA / 8).toFixed(0)} días de trabajo</p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl shadow-lg p-6">
                            <p className="text-xs font-medium text-cyan-50 uppercase tracking-wider">Ahorro estimado</p>
                            <p className="text-3xl font-black text-white mt-1">{totalAhorro} h · {ahorroPct}%</p>
                            <p className="text-sm text-cyan-50">~{(totalAhorro / 8).toFixed(0)} días recuperados</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Iniciativa</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Proyecto(s)</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Manual</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Con IA</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ahorro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {aiInitiatives.map((item) => {
                                    const ahorro = item.manualHoras - item.iaHoras;
                                    const pct = Math.round((ahorro / item.manualHoras) * 100);
                                    return (
                                        <Fragment key={item.id}>
                                            <tr className="bg-cyan-50/50 dark:bg-cyan-900/20">
                                                <td className="px-4 py-3 text-sm font-bold text-zinc-900 dark:text-zinc-100" colSpan={5}>
                                                    {item.id} {item.name}
                                                </td>
                                            </tr>
                                            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50">
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 italic pl-8" colSpan={5}>
                                                    {item.description}
                                                    <span className="block mt-1 not-italic text-xs text-cyan-700 dark:text-cyan-300">▸ {item.beneficio}</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 pl-12">Detalle</td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">{item.proyectos}</td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">{fmtHoras(item.manualHoras)}</td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">{fmtHoras(item.iaHoras)}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                                                        −{ahorro} h · {pct}%
                                                    </span>
                                                </td>
                                            </tr>
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                            <tfoot className="bg-zinc-100 dark:bg-zinc-800">
                                <tr>
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100" colSpan={2}>Total</td>
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100">{totalManual} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-cyan-600 dark:text-cyan-400">{totalIA} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-teal-600 dark:text-teal-400">−{totalAhorro} h · {ahorroPct}%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Justificación / mejora del flujo de trabajo */}
                    <div className="mt-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-3">Mejora en el flujo de trabajo</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                            El uso de IA en el área de Funcionalidad Tecnológica reduce de forma significativa el tiempo de desarrollo en tareas repetitivas, migraciones y refactorizaciones, lo que se traduce en entregas más rápidas y mayor capacidad para atender nuevos proyectos.
                        </p>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Aceleración de migraciones y refactors (Astro, pnpm, retiro de Sentinel) que de forma manual implican revisar cada proyecto archivo por archivo.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Estandarización de seguridad (MFA y rate limit) replicada de forma consistente en las 4 plataformas.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Integraciones nuevas (Stripe para EGAFI, bitácora con spatie/laravel-activitylog) con menos prueba y error.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Entregas más rápidas: el tiempo recuperado se reinvierte en pruebas, calidad y nuevos objetivos estratégicos.</li>
                        </ul>
                    </div>

                    <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-right">
                        Los tiempos son estimaciones comparativas (manual vs. asistido con IA). 1 día = 8 horas de trabajo.
                    </div>
                </div>
            </div>
        </div>
    );
};
