// Objetivos estratégicos 2026 del área de Funcionalidad Tecnológica.
// Cada iniciativa declara meta, responsable, avance (0-1) y los meses comprometidos (0 = enero).
export const strategicObjectives = [
    {
        id: "1.0",
        name: "SuiteDO",
        description: "Implementar y Pivotear SuiteDO",
        initiatives: [
            { id: "1.1.1", name: "Despliegue", meta: "100%", responsable: "Mario Zamora", avance: 1, meses: [0, 1] }, // E, F
            { id: "1.1.2", name: "Pivoteo", meta: "3 Clientes", responsable: "Funcionalidad Tecnológica", avance: 0.33, meses: [0, 1, 2, 4, 5] }, // E, F, M, M, J
            { id: "1.1.3", name: "Implementar IA Diagnosticos", meta: "100% Diagnósticos", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2, 3, 4] } // M, A, M
        ]
    },
    {
        id: "2.0",
        name: "NPS",
        description: "Desarrollar NPS (Aplicable a todos los servicios)",
        initiatives: [
            { id: "2.1.1", name: "DO", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [0, 1] }, // E, F
            { id: "2.1.2", name: "UHE", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [0, 1] }, // E, F
            { id: "2.1.3", name: "TALENTO", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [1, 2] } // F, M
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
            { id: "3.1.5", name: "Despliegue", meta: "suitedo.com", avance: 1, responsable: "Mario Zamora", meses: [3, 4] } // A, M
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
            { id: "4.1.4", name: "Despliegue", meta: "Humana11.com", responsable: "Mario Zamora", avance: 1, meses: [5] } // J
        ]
    },
    {
        id: "5.0",
        name: "Cursos Virtuales UHE",
        description: "Desarrollar la plataforma UHE para cursos virtuales",
        initiatives: [
            { id: "5.1.1", name: "Desarrollar BD", meta: "100%", responsable: "Mario Zamora", meses: [6] }, // J (Julio)
            { id: "5.1.2", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [6] }, // J (Julio)
            { id: "5.1.3", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [7] }, // A (Agosto)
            { id: "5.1.4", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [8] }, // S (Septiembre)
            { id: "5.1.5", name: "Despliegue", meta: "UHE", responsable: "Mario Zamora", meses: [8] } // S (Septiembre)
        ]
    },
    {
        id: "6.0",
        name: "Vacantes Talento",
        description: "Mostrar las vacantes disponibles de talento (Tráfico Talento y Humana11)",
        initiatives: [
            { id: "6.1.1", name: "Mostrar Vacantes Talento", meta: "100%", avance: 1, responsable: "Funcionalidad Tecnológica", meses: [5, 6] }, // J (Junio), J (Julio)
            { id: "6.1.2", name: "Ligar H11 a Talento", meta: "100%", responsable: "Funcionalidad Tecnológica", meses: [5, 6] }, // J (Junio), J (Julio)
            { id: "6.1.3", name: "Postularte como Candidato", meta: "100%", avance: 1, responsable: "Funcionalidad Tecnológica", meses: [6, 7] } // J (Julio), A (Agosto)
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
            { id: "6.1.10", name: "Despliegue", meta: "Play Store y App Store", responsable: "Mario Zamora", meses: [11] } // D
        ]
    },
    {
        id: "8.0",
        name: "App Assessment",
        description: "Desarrollar Plataforma para assessment",
        initiatives: [
            { id: "6.1.11", name: "Planificación y diseño", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [1] }, // F
            { id: "6.1.12", name: "Desarrollar Funcionalidad", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [1, 2] }, // F, M
            { id: "6.1.13", name: "Realizar Pruebas", meta: "100%", responsable: "Funcionalidad Tecnológica", avance: 1, meses: [2] }, // M
            { id: "6.1.14", name: "Despliegue", meta: "Talento", responsable: "Mario Zamora", avance: 1, meses: [2, 3] } // M, A
        ]
    },
];

export const MONTHS = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
