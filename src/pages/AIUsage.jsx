import { Fragment, useState } from 'react';

export const AIUsage = () => {
    const [query, setQuery] = useState('');
    // Tareas de julio–agosto 2026 apoyadas con IA. Horas: estimaciones comparativas (manual vs. asistido con IA).
    const tareas = [
        // SuiteDO
        { plataforma: "SuiteDO", tarea: "Chatbot Humi para diagnósticos", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "SuiteDO", tarea: "Habilitar el registro de consultores", cat: "Funcionalidad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Corregir error al listar colaboradores como participantes", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Habilitar la recuperación de contraseña", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Implementar FormRequests (validación de peticiones)", cat: "Seguridad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Endurecer seguridad: evitar inyección por payload ($request->all()), rate limit de contraseñas y validación de carga de archivos", cat: "Seguridad", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "API Resources (chat, content, enterprise) y ocultar secretos de 2FA", cat: "Seguridad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Enumerar preguntas en el reporte de patrones de conducta", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Elaborar informe técnico del diagnóstico de cultura", cat: "IA / Chatbot", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Chatbot Humi: añadir opción con IA", cat: "IA / Chatbot", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Refactorizar la BD de diagnósticos NOM-035 y Cultura", cat: "Base de Datos", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Revisar los tipos de preguntas", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Reporte en Excel de evaluación 360°", cat: "Funcionalidad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Ocultar el botón Ordenar cuando no hay registros (gestión de plantillas)", cat: "Frontend / UX", manualHoras: 2, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Asignar permisos de contraseñas al crear un administrador", cat: "Seguridad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "SuiteDO", tarea: "Generar el reporte Excel 360° automáticamente con IA", cat: "IA / Chatbot", manualHoras: 24, iaHoras: 8 },
        { plataforma: "SuiteDO", tarea: "Gestionar permisos de usuarios de un cliente desde el administrador", cat: "Funcionalidad", manualHoras: 10, iaHoras: 3 },
        { plataforma: "SuiteDO", tarea: "Ocultar la tolerancia en diagnósticos de Cultura y NOM-035 (campo nullable en BD)", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Validar el funcionamiento de NOM-035 y el diagnóstico de Cultura", cat: "Calidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "SuiteDO", tarea: "Advertir e impedir el cambio de tipo de encuesta para no romper diagnósticos aplicados", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Aplicar un diagnóstico desde plantillas", cat: "Funcionalidad", manualHoras: 10, iaHoras: 3 },
        { plataforma: "SuiteDO", tarea: "Recordar este dispositivo al iniciar sesión", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Onboarding tours en flujos clave del admin (crear plantilla, aplicar diagnóstico) con Driver.js", cat: "Frontend / UX", manualHoras: 16, iaHoras: 5 },
        { plataforma: "SuiteDO", tarea: "Leyenda de solo lectura en diagnósticos fuera de borrador", cat: "Frontend / UX", manualHoras: 2, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Renombrar «Escala personalizada» a «Varias opciones»", cat: "Frontend / UX", manualHoras: 2, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Rediseño de categorías y preguntas", cat: "Frontend / UX", manualHoras: 12, iaHoras: 4 },
        { plataforma: "SuiteDO", tarea: "Quitar el candado del reporte anónimo", cat: "Funcionalidad", manualHoras: 3, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Filtro por colaboradores en diagnósticos NOM-035", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "SuiteDO", tarea: "Secciones desplegables (preguntas y categorías)", cat: "Frontend / UX", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Reincorporar instrucciones (Driver.js) en la creación de categorías y preguntas", cat: "Frontend / UX", manualHoras: 4, iaHoras: 1 },
        { plataforma: "SuiteDO", tarea: "Establecer estándares y pruebas de código", cat: "Calidad", manualHoras: 16, iaHoras: 5 },

        // Humana11-Frontend
        { plataforma: "Humana11-Frontend", tarea: "Crear una isla de Astro para la sección de recursos", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Humana11-Frontend", tarea: "Optimizar imágenes con <Image /> de Astro (lazy load + sharp) para mejorar el performance", cat: "Frontend / UX", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Humana11-Frontend", tarea: "Mejorar la accesibilidad (a11y) para SEO", cat: "Frontend / UX", manualHoras: 10, iaHoras: 3 },
        { plataforma: "Humana11-Frontend", tarea: "Centrar el modal de testimoniales", cat: "Frontend / UX", manualHoras: 2, iaHoras: 1 },

        // Humana11-Web
        { plataforma: "Humana11-Web", tarea: "Actualizar la sección de Espacios", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Humana11-Web", tarea: "Corregir el error 403 para usuarios Humana11", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },

        // Humana11-Admin
        { plataforma: "Humana11-Admin", tarea: "Registrar todas las contraseñas en el gestor", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "Visualizar las contraseñas asignadas al usuario", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "Mostrar badges de permisos en la tabla de usuarios", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "Chatbot Humi con opciones fijas y opciones con IA", cat: "IA / Chatbot", manualHoras: 40, iaHoras: 12 },
        { plataforma: "Humana11-Admin", tarea: "Endurecer seguridad: evitar inyección por payload ($request->all()), rate limit de contraseñas y validación de carga de archivos", cat: "Seguridad", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Humana11-Admin", tarea: "Agregar los FormRequests necesarios", cat: "Seguridad", manualHoras: 10, iaHoras: 3 },
        { plataforma: "Humana11-Admin", tarea: "Agregar los API Resources necesarios", cat: "Seguridad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Humana11-Admin", tarea: "Recordar este dispositivo al iniciar sesión", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Humana11-Admin", tarea: "Migrar de TypeScript 6 a TypeScript 7", cat: "Deuda Técnica", manualHoras: 8, iaHoras: 3 },

        // Talento
        { plataforma: "Talento", tarea: "React Table: conservar el número de paginación al recargar", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Recordar este dispositivo al iniciar sesión", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Diagnósticos para vacantes", cat: "Funcionalidad", manualHoras: 16, iaHoras: 5 },
        { plataforma: "Talento", tarea: "Diagnósticos con plantillas", cat: "Funcionalidad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "Talento", tarea: "Aplicar diagnósticos al finalizar el proceso de la vacante", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Talento", tarea: "Diagnósticos NPS", cat: "Funcionalidad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "Talento", tarea: "Puntuación de opciones de preguntas del diagnóstico", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Ponderación de preguntas por sección del diagnóstico", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Seleccionar NPS al finalizar una vacante (cliente y candidato)", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "Talento", tarea: "Reporte NPS", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "Talento", tarea: "Seeder de NPS", cat: "Base de Datos", manualHoras: 3, iaHoras: 1 },
        { plataforma: "Talento", tarea: "Mostrar el botón Contratar al completar el proceso de la vacante", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "Talento", tarea: "Añadir captcha al formulario de registro de candidatos", cat: "Seguridad", manualHoras: 4, iaHoras: 1 },

        // Humana11
        { plataforma: "Humana11", tarea: "Gestión de cupones de descuento para EGAFI (−$1,000)", cat: "Funcionalidad", manualHoras: 12, iaHoras: 4 },
        { plataforma: "Humana11", tarea: "React Table: conservar el número de paginación al recargar", cat: "Frontend / UX", manualHoras: 6, iaHoras: 2 },

        // UHE
        { plataforma: "UHE", tarea: "Chatbot Humi: añadir opción con IA", cat: "IA / Chatbot", manualHoras: 16, iaHoras: 5 },
        { plataforma: "UHE", tarea: "Corregir: el Quiz no se mostraba", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Corregir: la Encuesta no se mostraba", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Fechas de inicio y fin opcionales en Quiz y Encuesta (desbloquear la fecha final al fijar la de inicio)", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Corregir: no se veían los participantes del Quiz", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Gráfica de respuestas cerradas (Sí/No) en el reporte de encuestas", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Recordar este dispositivo al iniciar sesión", cat: "Seguridad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Promedio del quiz entre todos los participantes", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Encuesta: opción múltiple", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Varias opciones en la encuesta de contenido", cat: "Funcionalidad", manualHoras: 6, iaHoras: 2 },
        { plataforma: "UHE", tarea: "Migrar de TypeScript 6 a TypeScript 7", cat: "Deuda Técnica", manualHoras: 8, iaHoras: 3 },
        { plataforma: "UHE", tarea: "Rediseño de categorías y preguntas", cat: "Frontend / UX", manualHoras: 12, iaHoras: 4 },
        { plataforma: "UHE", tarea: "Bloquear (candado) la ponderación de preguntas del Quiz", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Opción «Otro» en las opciones de diagnóstico", cat: "Funcionalidad", manualHoras: 4, iaHoras: 1 },
        { plataforma: "UHE", tarea: "Crear apartado para subir los certificados de los alumnos", cat: "Funcionalidad", manualHoras: 10, iaHoras: 3 },

        // Otros
        { plataforma: "Otros", tarea: "Reporte de uso de espacios", cat: "Funcionalidad", manualHoras: 8, iaHoras: 3 },
    ];

    const catStyles = {
        "Seguridad": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
        "Infraestructura": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
        "Deuda Técnica": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
        "Frontend / UX": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
        "IA / Chatbot": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
        "Calidad": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        "Funcionalidad": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        "Base de Datos": "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200",
    };

    const totalManual = tareas.reduce((acc, t) => acc + t.manualHoras, 0);
    const totalIA = tareas.reduce((acc, t) => acc + t.iaHoras, 0);
    const totalAhorro = totalManual - totalIA;
    const ahorroPct = Math.round((totalAhorro / totalManual) * 100);

    // Filtrado por búsqueda (tarea, plataforma o categoría).
    const q = query.trim().toLowerCase();
    const tareasFiltradas = q
        ? tareas.filter((t) => `${t.tarea} ${t.plataforma} ${t.cat}`.toLowerCase().includes(q))
        : tareas;

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

    const fmtHoras = (h) => `${h} h (~${(h / 8).toFixed(1)} d)`;

    return (
        <div>
            <div className="flex flex-col py-12 md:py-20">
                <div className="container m-auto p-4 md:p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-4">
                        Uso de IA
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-8">
                        Tareas del área de Funcionalidad Tecnológica desarrolladas con apoyo de Inteligencia Artificial durante julio y agosto, y el tiempo de desarrollo que representaron frente al trabajo manual.
                    </p>

                    {/* Tarjetas resumen */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Estimado manual</p>
                            <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 mt-1">{totalManual} h</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">~{(totalManual / 8).toFixed(0)} días de trabajo</p>
                        </div>
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Con apoyo de IA</p>
                            <p className="text-2xl sm:text-3xl font-black text-lime-600 dark:text-lime-400 mt-1">{totalIA} h</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">~{(totalIA / 8).toFixed(0)} días de trabajo</p>
                        </div>
                        <div className="bg-gradient-to-br from-lime-500 to-lime-700 rounded-2xl shadow-lg p-6">
                            <p className="text-xs font-medium text-lime-50 uppercase tracking-wider">Ahorro estimado</p>
                            <p className="text-2xl sm:text-3xl font-black text-white mt-1">{totalAhorro} h · {ahorroPct}%</p>
                            <p className="text-sm text-lime-50">~{(totalAhorro / 8).toFixed(0)} días recuperados</p>
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

                    <div className="mb-4 relative max-w-md">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar tarea, plataforma o categoría…"
                            className="w-full px-4 py-2 pr-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                aria-label="Limpiar búsqueda"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="overflow-auto max-h-[70vh] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
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
                                {grupos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                            No se encontraron resultados para “{query}”.
                                        </td>
                                    </tr>
                                )}
                                {grupos.map((grupo) => (
                                    <Fragment key={grupo.plataforma}>
                                        <tr className="bg-lime-50/50 dark:bg-lime-900/20">
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
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200">
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
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100" colSpan={3}>{q ? 'Total (filtrado)' : 'Total'}</td>
                                    <td className="px-4 py-3 text-sm font-black text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{footManual} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-lime-600 dark:text-lime-400 whitespace-nowrap">{footIA} h</td>
                                    <td className="px-4 py-3 text-sm font-black text-lime-700 dark:text-lime-300 whitespace-nowrap">−{footAhorro} h · {footPct}%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Justificación / mejora del flujo de trabajo */}
                    <div className="mt-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 mb-3">Mejora en el flujo de trabajo</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                            El apoyo de IA permitió al área de Funcionalidad Tecnológica atender en dos meses {tareas.length} tareas en {plataformas.length} plataformas del ecosistema, cubriendo seguridad, funcionalidades nuevas, experiencia de usuario, deuda técnica y capacidades con IA.
                        </p>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <li className="flex items-start gap-2"><span className="text-lime-600 dark:text-lime-400 font-bold">▸</span> Seguridad reforzada: FormRequests, API Resources, rate limit de contraseñas, protección contra inyección por payload, captcha, 2FA y «recordar dispositivo» replicados en las plataformas.</li>
                            <li className="flex items-start gap-2"><span className="text-lime-600 dark:text-lime-400 font-bold">▸</span> Diagnósticos ampliados: NOM-035 y Cultura refactorizados, evaluación 360° en Excel, y diagnósticos con plantillas y NPS integrados a Talento.</li>
                            <li className="flex items-start gap-2"><span className="text-lime-600 dark:text-lime-400 font-bold">▸</span> Capacidades con IA: chatbot Humi con opciones fijas y con IA, e informes/reportes 360° generados automáticamente.</li>
                            <li className="flex items-start gap-2"><span className="text-lime-600 dark:text-lime-400 font-bold">▸</span> Experiencia y calidad: onboarding tours con Driver.js, optimización de imágenes y accesibilidad (SEO) en el frontend, migración a TypeScript 7 y estándares con pruebas de código.</li>
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
