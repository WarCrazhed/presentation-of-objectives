import { Fragment } from 'react';

export const StrategicObjective = () => {
    const strategicObjectives = [
        {
            id: "1.0",
            name: "SuiteDO",
            description: "Implementar y Pivotear SuiteDO",
            initiatives: [
                { id: "1.1.1", name: "Implementación", meta: "100%", responsable: "Mario Zamora", avance: 1, meses: [0, 1] }, // E, F
                { id: "1.1.2", name: "Pivoteo", meta: "3 Clientes", responsable: "Funcionalidad Tecnológica", avance: 0, meses: [0, 1, 2, 4, 5] }, // E, F, M, M, J
                { id: "1.1.3", name: "Implmentar IA Diagnosticos", meta: "100% Diagnósticos", responsable: "Funcionalidad Tecnológica", meses: [2, 3, 4] } // M, A, M
            ]
        },
        {
            id: "2.0",
            name: "NPS",
            description: "Desarrollar NPS (Aplicable a todos los servicios)",
            initiatives: [
                { id: "2.1.1", name: "DO", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: .75, meses: [0, 1] }, // E, F
                { id: "2.1.2", name: "UHE", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [0, 1] }, // E, F
                { id: "2.1.3", name: "TALENTO", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [1, 2] } // F, M
            ]
        },
        {
            id: "3.0",
            name: "Registro y Seguimiento de Mentores (SuiteDO)",
            description: "Desarrollar proceso para el registro, seguimiento y calificación de mentores",
            initiatives: [
                { id: "3.1.1", name: "Desarrollar BD", meta: "100%", avance: 1, responsable: "Mario Zamora", meses: [0] }, // E
                { id: "3.1.2", name: "Planificación y diseño", meta: "100%", avance: 1, responsable: "Funcionalidad Tecnológica", meses: [0] }, // E
                { id: "3.1.3", name: "Desarrollar Funcionalidad", meta: "100%", avance: 1, responsable: "Funcionalidad Tecnológica", meses: [1, 2] }, // F, M
                { id: "3.1.4", name: "Realizar Pruebas", meta: "100%", avance: 1, responsable: "Funcionalidad Tecnológica", meses: [3, 4] }, // A, M
                { id: "3.1.5", name: "Implementar", meta: "suitedo.com", avance: 1, responsable: "Mario Zamora", meses: [3, 4] } // A, M
            ]
        },
        {
            id: "4.0",
            name: "IA Página Web",
            description: "Desarrollar Asistente y Chatbot con IA",
            initiatives: [
                { id: "4.1.1", name: "Implementar API", meta: "(1-2) Modelo", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2, 3] }, // M, A
                { id: "4.1.2", name: "Entrenar Modelo de IA", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [3, 4] }, // A, M
                { id: "4.1.3", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [4, 5] }, // M, J
                { id: "4.1.4", name: "Implementar", meta: "Humana11.com", responsable: "Mario Zamora", avance: 1, meses: [5] } // J
            ]
        },
        {
            id: "5.0",
            name: "Cursos Virtuales UHE",
            description: "Desarrollar la plataforma UHE para cursos virtuales",
            initiatives: [
                { id: "5.1.1", name: "Desarrollar BD", meta: "100%", responsable: "Mario Zamora", meses: [4] }, // M
                { id: "5.1.2", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [4] }, // M
                { id: "5.1.3", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [5] }, // J
                { id: "5.1.4", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [6] }, // J
                { id: "5.1.5", name: "Implementar", meta: "UHE", responsable: "Mario Zamora", meses: [6] } // J
            ]
        },
        {
            id: "6.0",
            name: "Vacantes Talento",
            description: "Mostrar las vacantes disponibles de talento (Tráfico Talento y Humana11)",
            initiatives: [
                { id: "6.1.1", name: "Mostrar Vacantes Talento", meta: "100%", responsable: "Ernesto y Marlett", meses: [3] }, // A
                { id: "6.1.2", name: "Ligar H11 a Talento", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [3] }, // A
                { id: "6.1.3", name: "Postularte como Candidato", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [4] } // M
            ]
        },
        {
            id: "7.0",
            name: "App Móvil UHE",
            description: "Desarrollar Aplicación Móvil UHE (Play Store y App Store)",
            initiatives: [
                { id: "6.1.6", name: "Documentar equipo FT", meta: "100%", responsable: "Ernesto y Marlett", meses: [5] }, // J
                { id: "6.1.7", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [6, 7] }, // J, A
                { id: "6.1.8", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [7, 8, 9] }, // A, S, O
                { id: "6.1.9", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [9, 10] }, // O, N
                { id: "6.1.10", name: "Implementar", meta: "Play Store y App Store", responsable: "Mario Zamora", meses: [11] } // D
            ]
        },
        {
            id: "8.0",
            name: "App Assesment",
            description: "Desarrollar Plataforma para assesment",
            initiatives: [
                { id: "6.1.11", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [1] }, // F
                { id: "6.1.12", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [1, 2] }, // F, M
                { id: "6.1.13", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 0.25, meses: [2] }, // M
                { id: "6.1.14", name: "Implementar", meta: "Talento", responsable: "Mario Zamora", meses: [2, 3] } // M, A
            ]
        },
        {
            id: "9.0",
            name: "Sistema de Consulta",
            description: "Desarrollar Sistema para consultar Puestos (Web y NAS)",
            initiatives: [
                { id: "9.1.1", name: "Diseñar BD", meta: "100%", responsable: "Mario Zamora", meses: [0] }, // E
                { id: "9.1.2", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [0] }, // E
                { id: "9.1.3", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [1] }, // F
                { id: "9.1.4", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [1] }, // F
                { id: "9.1.5", name: "Implementar", meta: "H11 | NAS", responsable: "Mario Zamora", meses: [2] } // M
            ]
        }
    ];

    const months = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const lastUpdate = "2025-12-02 00:00:00";

    const isMonthActive = (initiativeMeses, monthIndex) => {
        return initiativeMeses?.includes(monthIndex) || false;
    };

    return (
        <div>
            <div className="flex flex-col bg-radial-[at_50%_75%] from-sky-100 via-zinc-100 to-slate-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
                <div className="container m-auto p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-indigo-600 mb-4">
                        Objetivos Estratégicos y Avances
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-2">
                        En este apartado se presentan los objetivos estratégicos del departamento de Funcionalidad Tecnológica.
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                        Última actualización: {new Date(lastUpdate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="overflow-x-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Objetivos e Intenciones Estratégicas</th>
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
                                {strategicObjectives.map((objective) => (
                                    <Fragment key={objective.id}>
                                        {/* Fila del objetivo principal */}
                                        <tr key={objective.id} className="bg-lime-50/50 dark:bg-lime-900/20">
                                            <td className="px-4 py-3 text-sm font-bold text-zinc-900 dark:text-zinc-100" colSpan={16}>
                                                {objective.id} {objective.name}
                                            </td>
                                        </tr>

                                        {/* Descripción del objetivo */}
                                        <tr key={`${objective.id}-desc`} className="bg-zinc-50/50 dark:bg-zinc-800/50">
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
                                                    {initiative.avance ? (
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
                                                            <span className="text-lime-600 dark:text-lime-400 font-bold">X</span>
                                                        ) : (
                                                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 text-right">
                        <span className="inline-flex items-center gap-4">
                            <span className="flex items-center gap-1"><span className="text-lime-600 dark:text-lime-400 font-bold">X</span> Mes previsto</span>
                            <span className="flex items-center gap-1"><span className="text-zinc-300 dark:text-zinc-700">•</span> Sin actividad</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};