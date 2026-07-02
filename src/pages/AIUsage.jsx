import { Fragment } from 'react';

export const AIUsage = () => {
    // Tareas de junio 2026 apoyadas con IA. Horas: estimaciones comparativas (manual vs. asistido con IA).
    const tareas = [
        // SuiteDO
        { plataforma: "SuiteDO", tarea: "Implementar NGINX y Dockerizar en Producción", cat: "Infraestructura", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Actualizar versión de Laravel (13)", cat: "Infraestructura", manualHoras: 24, iaHoras: 8 },
        { plataforma: "SuiteDO", tarea: "Generar y descargar reportes con IA (input para escribir un prompt)", cat: "IA / Chatbot", manualHoras: 24, iaHoras: 8 },
        { plataforma: "SuiteDO", tarea: "Aumentar rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Construir Skeleton + TableSkeleton + CardSkeleton (migra Collaborators y Dashboard)", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "react-query (TanStack Query): manejo de estado de servidor, reemplaza el patrón manual", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Arreglar / ejecutar ESLint para detectar y eliminar errores de código", cat: "Calidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Al recargar la página actual, no regresar al dashboard desde el principio", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Adaptar todos los SweetAlert al modo claro y oscuro", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "SuiteDO", tarea: "Mejorar accesibilidad HTML en general de toda la plataforma", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Chatbot Humi para administración de la plataforma", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "SuiteDO", tarea: "Implementar diagnóstico cultural", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "SuiteDO", tarea: "React Table: al recargar no perder la paginación y validar botones de avanzar/retroceder", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },

        // UHE
        { plataforma: "UHE", tarea: "MFA en la plataforma", cat: "Seguridad", manualHoras: 24, iaHoras: 8 },
        { plataforma: "UHE", tarea: "Migración de npm a pnpm", cat: "Deuda Técnica", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Resolver IDOR: exposición de datos de alumnos", cat: "Seguridad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "UHE", tarea: "Quitar Sentinel (librería en desuso)", cat: "Deuda Técnica", manualHoras: 20, iaHoras: 6 },
        { plataforma: "UHE", tarea: "Rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 8, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Implementar NGINX y Dockerizar en Producción", cat: "Infraestructura", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "Actualizar versión de Laravel (13)", cat: "Infraestructura", manualHoras: 24, iaHoras: 8 },
        { plataforma: "UHE", tarea: "Adaptar todos los SweetAlert al modo claro y oscuro", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Quitar nwidart/laravel-modules", cat: "Deuda Técnica", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "Implementar Chatbot", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "UHE", tarea: "Pasar todo el código JS a TS", cat: "Deuda Técnica", manualHoras: 40, iaHoras: 12 },
        { plataforma: "UHE", tarea: "Aumentar rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Al recargar la página actual, no regresar al dashboard desde el principio", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "react-query (TanStack Query): reemplaza el patrón manual (Rol Admin)", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "react-query (TanStack Query): reemplaza el patrón manual (Rol Students)", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "Construir Skeleton + TableSkeleton", cat: "Frontend / UX", manualHoras: 12, iaHoras: 4 },
        { plataforma: "UHE", tarea: "Lazy routes (React.lazy + Suspense)", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Quick-wins a11y: arreglos chicos de accesibilidad", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Unificar colores de SweetAlert en un helper con tokens (eliminar colores hardcoded en ~15 lugares, centralizar en useAlert)", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Seguridad: $request->all() (evitar inyección por payload), rate limit de passwords y carga de archivos", cat: "Seguridad", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "React Table: al recargar no perder el número de paginación", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "FormRequests", cat: "Seguridad", manualHoras: 12, iaHoras: 4 },

        // Talento
        { plataforma: "Talento", tarea: "Quitar Sentinel", cat: "Deuda Técnica", manualHoras: 20, iaHoras: 6 },
        { plataforma: "Talento", tarea: "Rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 8, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Implementar NGINX y Dockerizar en Producción", cat: "Infraestructura", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Talento", tarea: "Actualizar versión de Laravel (13)", cat: "Infraestructura", manualHoras: 24, iaHoras: 8 },
        { plataforma: "Talento", tarea: "Adaptar todos los SweetAlert al modo claro y oscuro", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Talento", tarea: "Aumentar rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "Talento", tarea: "Pasar todo el código JS a TS", cat: "Deuda Técnica", manualHoras: 40, iaHoras: 12 },
        { plataforma: "Talento", tarea: "Al recargar la página actual, no regresar al dashboard desde el principio", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Chatbot Humi para administración", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "Talento", tarea: "react-query (TanStack Query): reemplaza el patrón manual", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Talento", tarea: "Construir Skeleton + TableSkeleton", cat: "Frontend / UX", manualHoras: 12, iaHoras: 4 },
        { plataforma: "Talento", tarea: "Chatbot Humi para candidatos", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },

        // Humana11
        { plataforma: "Humana11", tarea: "Implementar NGINX y Dockerizar en Producción", cat: "Infraestructura", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Humana11", tarea: "Cambiar PHP 8.2 → 8.4 y Laravel 10 → 13", cat: "Infraestructura", manualHoras: 32, iaHoras: 10 },
        { plataforma: "Humana11", tarea: "Construir Skeleton + TableSkeleton", cat: "Frontend / UX", manualHoras: 12, iaHoras: 4 },

        // Humana11-Admin
        { plataforma: "Humana11-Admin", tarea: "Rate limit para inicios de sesión", cat: "Seguridad", manualHoras: 8, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "spatie/laravel-activitylog (bitácora de trazabilidad)", cat: "Seguridad", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Humana11-Admin", tarea: "Gestor de contraseñas", cat: "Seguridad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "Humana11-Admin", tarea: "Al recargar la página actual, no regresar al dashboard desde el principio", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "react-query (TanStack Query): reemplaza el patrón manual", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },

        // Humana11-Backend
        { plataforma: "Humana11-Backend", tarea: "Pasar todo el código JS a TS", cat: "Deuda Técnica", manualHoras: 40, iaHoras: 12 },

        // DB
        { plataforma: "DB", tarea: "Depurar la tabla telescope_entries en la BD de Talento (demasiados registros, ~170 MB)", cat: "Infraestructura", manualHoras: 4, iaHoras: 1 },
    ];

    const catStyles = {
        "Seguridad": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
        "Infraestructura": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
        "Deuda Técnica": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
        "Frontend / UX": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
        "IA / Chatbot": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
        "Calidad": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    };

    const totalManual = tareas.reduce((acc, t) => acc + t.manualHoras, 0);
    const totalIA = tareas.reduce((acc, t) => acc + t.iaHoras, 0);
    const totalAhorro = totalManual - totalIA;
    const ahorroPct = Math.round((totalAhorro / totalManual) * 100);

    // Agrupar por plataforma preservando orden de aparición.
    const plataformas = [...new Set(tareas.map((t) => t.plataforma))];
    const grupos = plataformas.map((p) => ({
        plataforma: p,
        items: tareas.filter((t) => t.plataforma === p),
    }));

    const lastUpdate = "2026-06-30 00:00:00";

    const fmtHoras = (h) => `${h} h (~${(h / 8).toFixed(1)} d)`;

    return (
        <div>
            <div className="flex flex-col bg-radial-[at_50%_75%] from-cyan-50 via-zinc-100 to-teal-50 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
                <div className="container m-auto p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-teal-600 mb-4">
                        Uso de IA
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-2">
                        Tareas del área de Funcionalidad Tecnológica desarrolladas con apoyo de Inteligencia Artificial durante junio y el tiempo de desarrollo que representó frente al trabajo manual.
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

                    {/* Leyenda de categorías */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {Object.entries(catStyles).map(([cat, cls]) => (
                            <span key={cat} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>
                                {cat}
                            </span>
                        ))}
                    </div>

                    <div className="overflow-auto max-h-[70vh] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Iniciativa</th>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Proyecto(s)</th>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Categoría</th>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Manual</th>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Con IA</th>
                                    <th scope="col" className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ahorro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {grupos.map((grupo) => (
                                    <Fragment key={grupo.plataforma}>
                                        <tr className="bg-cyan-50/50 dark:bg-cyan-900/20">
                                            <td className="px-4 py-3 text-sm font-bold text-zinc-900 dark:text-zinc-100" colSpan={6}>
                                                {grupo.plataforma}
                                                <span className="ml-2 font-normal text-zinc-500 dark:text-zinc-400">({grupo.items.length})</span>
                                            </td>
                                        </tr>
                                        {grupo.items.map((item, i) => {
                                            const ahorro = item.manualHoras - item.iaHoras;
                                            const pct = Math.round((ahorro / item.manualHoras) * 100);
                                            return (
                                                <tr key={`${grupo.plataforma}-${i}`} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                    <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 pl-8">{item.tarea}</td>
                                                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{item.plataforma}</td>
                                                    <td className="px-4 py-2 text-sm whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${catStyles[item.cat]}`}>
                                                            {item.cat}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{fmtHoras(item.manualHoras)}</td>
                                                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{fmtHoras(item.iaHoras)}</td>
                                                    <td className="px-4 py-2 text-sm whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                                                            −{ahorro} h · {pct}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </Fragment>
                                ))}
                            </tbody>
                            <tfoot className="bg-zinc-100 dark:bg-zinc-800">
                                <tr>
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100" colSpan={3}>Total</td>
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{totalManual} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-cyan-600 dark:text-cyan-400 whitespace-nowrap">{totalIA} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-teal-600 dark:text-teal-400 whitespace-nowrap">−{totalAhorro} h · {ahorroPct}%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Justificación / mejora del flujo de trabajo */}
                    <div className="mt-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-3">Mejora en el flujo de trabajo</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                            El apoyo de IA permitió al área de Funcionalidad Tecnológica atender en un solo mes {tareas.length} tareas en {plataformas.length} plataformas del ecosistema, cubriendo seguridad, infraestructura, deuda técnica, experiencia de usuario y nuevas funcionalidades con IA.
                        </p>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Seguridad estandarizada: MFA, rate limiting, resolución de IDOR, FormRequests y bitácora de trazabilidad replicados en las plataformas.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Infraestructura homologada: NGINX + Docker en producción y actualización a Laravel 13 / PHP 8.4 en varios proyectos.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Reducción de deuda técnica: retiro de Sentinel y nwidart/laravel-modules, migración de npm a pnpm y de JS a TS.</li>
                            <li className="flex items-start gap-2"><span className="text-cyan-600 dark:text-cyan-400 font-bold">▸</span> Nuevas capacidades con IA: chatbots Humi, generación de reportes con IA y diagnóstico cultural.</li>
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
