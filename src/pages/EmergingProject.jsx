export const EmergingProject = () => {
    const emergingProjects = [
        {
            id: "E1.0",
            name: "Nuevo diagnóstico de Patrones de conducta",
            description: "Diagnóstico especializado para el mes de Marzo",
            initiatives: [
                { id: "E1.1.1", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E1.1.2", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E1.1.3", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E1.1.4", name: "Despliegue", meta: "100%", responsable: "Mario Zamora", avance: 1, meses: [2] } // M
            ]
        },
        {
            id: "E2.0",
            name: "Desarrollar Diagnóstico Customizado para Consejo Magnetika",
            description: "Diagnóstico especializado para el mes de Marzo",
            initiatives: [
                { id: "E2.1.1", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E2.1.2", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E2.1.3", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [3] }, // M
                { id: "E2.1.4", name: "Despliegue", meta: "100%", responsable: "Mario Zamora", avance: 1, meses: [3] } // M
            ]
        },
        {
            id: "E3.0",
            name: "Desarrollar Diagnóstico para página web Humana11",
            description: "Diagnóstico especializado para el mes de Marzo",
            initiatives: [
                { id: "E3.1.3", name: "Desarrollar y adaptar", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [3] }, // M
                { id: "E3.1.4", name: "Despliegue", meta: "100%", responsable: "Mario Zamora", avance: 1, meses: [3] } // M
            ]
        },
        {
            id: "E4.0",
            name: "Desarrollar Diagnóstico Customizado tipo Forms (EuropCar)",
            description: "Diagnóstico especializado para el mes de Marzo",
            initiatives: [
                { id: "E4.1.1", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
                { id: "E4.1.2", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 0.50, meses: [2] }, // M
                { id: "E4.1.3", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 0, meses: [3] }, // M
                { id: "E4.1.4", name: "Despliegue", meta: "100%", responsable: "Mario Zamora", avance: 0, meses: [3] } // M
            ]
        },
    ];

    const months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const lastUpdate = new Date().toISOString();

    const isMonthActive = (initiativeMeses, monthIndex) => {
        return initiativeMeses?.includes(monthIndex) || false;
    };

    return (
        <div>
            <div className="flex flex-col bg-radial-[at_50%_75%] from-amber-50 via-zinc-100 to-orange-50 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
                <div className="container m-auto p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600 mb-4">
                        Proyectos Emergentes
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-2">
                        Iniciativas y tareas no previstas integradas durante el ciclo actual.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                        Última actualización: {new Date(lastUpdate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="overflow-x-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Proyecto / Iniciativa</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Meta</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Responsable(s)</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Avance</th>
                                    {months.map((month, index) => (
                                        <th key={index} scope="col" className="px-2 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                            {month}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                                {emergingProjects.map((objective) => (
                                    <>
                                        {/* Fila del objetivo principal */}
                                        <tr key={objective.id} className="bg-orange-50/50 dark:bg-orange-900/20">
                                            <td className="px-4 py-3 text-sm font-bold text-zinc-900 dark:text-zinc-100" colSpan={16}>
                                                {objective.id} {objective.name}
                                            </td>
                                        </tr>

                                        {/* Descripción del objetivo */}
                                        <tr className="bg-zinc-50/50 dark:bg-zinc-800/50">
                                            <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 italic pl-8" colSpan={16}>
                                                {objective.description}
                                            </td>
                                        </tr>

                                        {/* Iniciativas */}
                                        {objective.initiatives.map((initiative) => (
                                            <tr key={initiative.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <td className="px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 pl-12">
                                                    {initiative.id} {initiative.name}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                    {initiative.meta}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                    {initiative.responsable}
                                                </td>
                                                <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                    {initiative.avance !== undefined ? (
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${initiative.avance < 0.5 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : initiative.avance < 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200'}`}>
                                                            {Math.round(initiative.avance * 100)}%
                                                        </span>
                                                    ) : (
                                                        <span className="text-zinc-400 dark:text-zinc-600">—</span>
                                                    )}
                                                </td>
                                                {months.map((_, index) => (
                                                    <td key={index} className="px-2 py-2 text-center text-sm font-medium">
                                                        {isMonthActive(initiative.meses, index) ? (
                                                            <span className="text-orange-600 dark:text-orange-400 font-bold">X</span>
                                                        ) : (
                                                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-right">
                        <span className="inline-flex items-center gap-4">
                            <span className="flex items-center gap-1"><span className="text-orange-600 dark:text-orange-400 font-bold">X</span> Mes previsto</span>
                            <span className="flex items-center gap-1"><span className="text-zinc-300 dark:text-zinc-700">•</span> Sin actividad</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
