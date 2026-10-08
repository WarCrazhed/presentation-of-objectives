// Actividad de septiembre y octubre 2026, consultada el 2026-10-08 contra las BD del
// ecosistema en 216.238.86.245 (suitedo, humana11, uhe, talento, criba). Solo lectura.
//   Suitedo    → diagnostic_applieds con start_datetime en el periodo
//   Página Web → resources con published_at en el periodo
//   UHE        → prg_programs creados + prg_modules que inician en el periodo
//   Talento    → vacancies creadas en el periodo + alta de candidates agregada
//   Criba      → mentors, evaluations y accesos a SuiteDO/UHE en el periodo, solo agregados
// Generado por scripts/uso-plataformas.mjs — no editar a mano si vas a regenerarlo.
export const platforms = [
    {
        id: 1,
        name: "Suitedo",
        img: "https://suitedo.com/resources/suitedo-logo.png",
        description: "Plataforma de desarrollo organizacional",
        records: [
            {
                "name": "EGD002 - 23",
                "date_start": "01 Septiembre 2026",
                "date_end": "26 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "Sesión 1: Liderazgo Situacional Gestión de Equipos",
                "date_start": "03 Septiembre 2026",
                "date_end": "04 Abril 2027",
                "status": "En Proceso"
            },
            {
                "name": "NPS- 3 TRIMESTRE",
                "date_start": "07 Septiembre 2026",
                "date_end": "30 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "EGD002 - 24",
                "date_start": "08 Septiembre 2026",
                "date_end": "26 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "CLIMA LABORAL- H11- 2026",
                "date_start": "09 Septiembre 2026",
                "date_end": "30 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "Masterclass 9 de septiembre",
                "date_start": "09 Septiembre 2026",
                "date_end": "11 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "DIAGNÓSTICO INICIAL GRÚAS INDUSTRIALES BRAVO",
                "date_start": "18 Septiembre 2026",
                "date_end": "10 Octubre 2026",
                "status": "En Proceso"
            },
            {
                "name": "EGD002 - 25",
                "date_start": "22 Septiembre 2026",
                "date_end": "27 Septiembre 2026",
                "status": "Completado"
            },
            {
                "name": "CLIMA LABORAL - CARNES DE PRIMERA",
                "date_start": "30 Septiembre 2026",
                "date_end": "31 Octubre 2026",
                "status": "En Proceso"
            },
            {
                "name": "EGD003 - 01",
                "date_start": "01 Octubre 2026",
                "date_end": "30 Abril 2027",
                "status": "En Proceso"
            },
            {
                "name": "Masterclass - 07/10/2026 - Planeación Estegica",
                "date_start": "07 Octubre 2026",
                "date_end": "11 Octubre 2026",
                "status": "En Proceso"
            },
            {
                "name": "EGD003 - 02",
                "date_start": "08 Octubre 2026",
                "date_end": "03 Abril 2027",
                "status": "En Proceso"
            },
            {
                "name": "EGD003 - 03",
                "date_start": "15 Octubre 2026",
                "date_end": "03 Abril 2027",
                "status": "En Proceso"
            },
            {
                "name": "EGD003 - 04",
                "date_start": "22 Octubre 2026",
                "date_end": "03 Abril 2027",
                "status": "En Proceso"
            },
            {
                "name": "EGD003 - 05",
                "date_start": "29 Octubre 2026",
                "date_end": "03 Abril 2027",
                "status": "En Proceso"
            }
        ]
    },
    {
        id: 2,
        name: "Página Web",
        img: "https://humana11.com/img/logos/humana11.webp",
        description: "Página web de Humana11",
        records: [
            {
                "name": "Entrada Blog | La relevancia de la evaluación al desempeño en la Alta Dirección",
                "date_start": "31 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | La importancia del trabajo híbrido",
                "date_start": "27 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Cultura de aprendizaje: cuando el error deja de ser un castigo",
                "date_start": "24 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Tres tiendas al día: el secreto detrás del imperio OXXO",
                "date_start": "20 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | El error como principal fuente de aprendizaje: convirtiendo fallas en ventaja competitiva",
                "date_start": "17 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Impacto generacional en el trabajo",
                "date_start": "12 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Gamificación ejecutiva: cuando jugar es la decisión más rentable del trimestre",
                "date_start": "09 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Angélica Fuentes: del fondo al liderazgo que empodera a otras mujeres",
                "date_start": "03 de Octubre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Dilemas del Director General en 2026: decidir en el cruce de la presión, la reinvención y el riesgo",
                "date_start": "30 de Septiembre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | De los datos a las decisiones: El auge de la cultura Data-Driven",
                "date_start": "26 de Septiembre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | ¿Qué es una competencia laboral?",
                "date_start": "19 de Septiembre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Learning in the Flow of Work: aprende sin detener la operación",
                "date_start": "15 de Septiembre 2026",
                "date_end": null,
                "status": "Publicado"
            },
            {
                "name": "Entrada Blog | Juntas que sí sirven: guía para dejar de perder tiempo",
                "date_start": "12 de Septiembre 2026",
                "date_end": null,
                "status": "Publicado"
            }
        ]
    },
    {
        id: 3,
        name: "UHE",
        img: "https://universidadhumanaempresaria.com/UHE/isotipoUHE_Sinfondo.png",
        description: "Universidad Humana Empresaria",
        records: [
            {
                "name": "Módulo | Informe académico: Final del ciclo",
                "date_start": "01 de Septiembre 2026",
                "date_end": "26 de Septiembre 2026",
                "status": "Activo"
            },
            {
                "name": "Módulo | Eje 6: Desarrollo Organizacional",
                "date_start": "18 de Septiembre 2026",
                "date_end": "30 de Octubre 2026",
                "status": "Activo"
            },
            {
                "name": "Módulo | Desarrollo Ejecutivo Gerencial: Proyección y toma de decisiones",
                "date_start": "22 de Septiembre 2026",
                "date_end": "26 de Septiembre 2026",
                "status": "Activo"
            },
            {
                "name": "Módulo | Inducción a la plataforma",
                "date_start": "23 de Septiembre 2026",
                "date_end": "03 de Abril 2027",
                "status": "Activo"
            },
            {
                "name": "Módulo | Dirección y gestión del capital humano: Del propósito al equipo: Liderazgo consciente y dirección de personas",
                "date_start": "25 de Septiembre 2026",
                "date_end": "11 de Octubre 2026",
                "status": "Activo"
            },
            {
                "name": "Módulo | Dirección y gestión del capital humano: Gestión estratégica del ciclo de vida del talento",
                "date_start": "15 de Octubre 2026",
                "date_end": "31 de Octubre 2026",
                "status": "Activo"
            },
            {
                "name": "Módulo | Desarrollo Ejecutivo Gerencial: Proyección y toma de decisiones",
                "date_start": "29 de Octubre 2026",
                "date_end": "19 de Noviembre 2026",
                "status": "Activo"
            }
        ]
    },
    {
        id: 4,
        name: "Talento",
        img: "https://talento11.com/img/talento.png",
        description: "Reclutamiento y assessment psicométrico",
        records: [
            {
                "name": "Vacante | Gerente de Operaciones La Mazorca",
                "date_start": "03 de Septiembre 2026",
                "date_end": null,
                "status": "Activo"
            },
            {
                "name": "Vacante | Coordinador Comercial B2C",
                "date_start": "10 de Septiembre 2026",
                "date_end": null,
                "status": "Activo"
            },
            {
                "name": "Vacante | Mentor Septiembre 2026",
                "date_start": "23 de Septiembre 2026",
                "date_end": null,
                "status": "Activo"
            },
            {
                "name": "Candidatos | 21 nuevos candidatos registrados",
                "date_start": "03 de Septiembre 2026",
                "date_end": "07 de Octubre 2026",
                "status": "Activo"
            }
        ]
    },
    {
        id: 5,
        name: "Criba de Mentores",
        img: "https://humana11.com/img/logos/humana11.webp",
        description: "Padrón y evaluación de mentores",
        records: [
            {
                "name": "Mentores | 13 nuevos mentores registrados",
                "date_start": "01 de Septiembre 2026",
                "date_end": "02 de Octubre 2026",
                "status": "Activo"
            },
            {
                "name": "Accesos | 1 cuenta creada en SuiteDO y 1 en UHE",
                "date_start": "02 de Octubre 2026",
                "date_end": "02 de Octubre 2026",
                "status": "Activo"
            }
        ]
    }
];
