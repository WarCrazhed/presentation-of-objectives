#!/usr/bin/env node
/*
 * Regenera src/data/platforms.js con la actividad real del ecosistema para un periodo.
 *
 *   node scripts/uso-plataformas.mjs "agosto + septiembre 2026"
 *   node scripts/uso-plataformas.mjs "septiembre 2026" --dry-run
 *
 * Se conecta por SSH al server de BD (216.238.86.245) y ejecuta SOLO SELECT.
 * Cada sentencia pasa por assertSoloLectura() antes de salir de este proceso:
 * si algo distinto de SELECT llega a la lista, el script aborta sin conectarse.
 */
import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import nspell from 'nspell'
import diccionario from 'dictionary-es'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = path.join(RAIZ, 'src/data/platforms.js')
const SERVIDOR = 'root@216.238.86.245'
const LLAVE = '~/.ssh/id_ed25519'   // id_rsa es la llave vieja de Linode y falla

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const MES_TITULO = MESES.map((m) => m[0].toUpperCase() + m.slice(1))

/* ---------------------------------------------------------------- periodo */

// "agosto + septiembre 2026" → { desde: 2026-08-01, hasta: 2026-10-01, etiqueta }
export const parsePeriodo = (texto, hoy = new Date().toLocaleDateString('sv-SE')) => {
    const limpio = texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const anio = limpio.match(/\b(20\d{2})\b/)?.[1]
    if (!anio) throw new Error(`Falta el año en «${texto}». Ejemplo: "agosto + septiembre 2026".`)

    const indices = MESES
        .map((mes, i) => [mes.normalize('NFD').replace(/[̀-ͯ]/g, ''), i])
        .filter(([mes]) => new RegExp(`\\b${mes.slice(0, 4)}\\w*`).test(limpio))
        .map(([, i]) => i)
        .sort((a, b) => a - b)

    if (!indices.length) throw new Error(`No reconocí ningún mes en «${texto}». Escríbelos completos: "agosto + septiembre 2026".`)

    const primero = indices[0]
    const ultimo = indices[indices.length - 1]
    const dos = (n) => String(n + 1).padStart(2, '0')

    const desde = `${anio}-${dos(primero)}-01`
    const hasta = ultimo === 11 ? `${Number(anio) + 1}-01-01` : `${anio}-${dos(ultimo + 1)}-01`

    // Periodo anterior: mismos meses de largo, justo antes (oct–nov → ago–sep).
    const largo = ultimo - primero + 1
    const ini = new Date(Date.UTC(Number(anio), primero - largo, 1))
    const indAnt = Array.from({ length: largo }, (_, k) => new Date(Date.UTC(ini.getUTCFullYear(), ini.getUTCMonth() + k, 1)))
    const iso = (d) => d.toISOString().slice(0, 10)
    const dia = 86400000
    const corto = (isoFecha) => {
        const [, m, d] = isoFecha.split('-')
        return `${Number(d)} ${MESES[Number(m) - 1].slice(0, 3)}`
    }

    // Si el periodo sigue abierto, las métricas se cortan a hoy y el anterior al mismo
    // número de días; si no, oct–nov a medias se compararía contra ago–sep completo.
    const manana = iso(new Date(Date.parse(hoy) + dia))
    const abierto = manana > desde && manana < hasta
    const corte = abierto ? manana : hasta
    const dias = Math.round((Date.parse(corte) - Date.parse(desde)) / dia)
    const antHasta = abierto ? iso(new Date(ini.getTime() + dias * dia)) : desde
    const etiquetaAnt = indAnt.map((d) => MESES[d.getUTCMonth()]).join(' y ') + ` ${indAnt[largo - 1].getUTCFullYear()}`
    const ultimoDia = (h) => iso(new Date(Date.parse(h) - dia))

    return {
        anterior: {
            desde: iso(ini),
            hasta: antHasta,
            etiqueta: abierto ? `${etiquetaAnt} (al ${corto(ultimoDia(antHasta))})` : etiquetaAnt
        },
        metricas: { desde, hasta: corte },
        corte: abierto ? `al ${corto(hoy)}` : null,
        anio: Number(anio),
        desde,
        hasta,
        etiqueta: indices.map((i) => MESES[i]).join(' y ') + ` ${anio}`,
        meses: indices
    }
}

/* ------------------------------------------------------------- solo lectura */

const assertSoloLectura = (sql) => {
    const s = sql.trim()
    if (!/^SELECT\b/i.test(s)) throw new Error(`Sentencia bloqueada (no es SELECT): ${s.slice(0, 80)}`)
    if (/\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|REPLACE|GRANT|SET)\b/i.test(s)) {
        throw new Error(`Sentencia bloqueada (verbo de escritura): ${s.slice(0, 80)}`)
    }
    return s
}

// Una sola sesión SSH para todas las consultas; cada bloque se separa con un centinela.
const CENTINELA = '@@@'

const consultar = (bloques) => {
    const payload = bloques
        .map(({ clave, sql }) => `echo "${CENTINELA}${clave}"; mysql -N -B -e ${shquote(assertSoloLectura(sql))}`)
        .join('\n')

    const salida = execFileSync('ssh', [
        '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15',
        '-i', LLAVE.replace('~', process.env.HOME), SERVIDOR, payload
    ], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })

    const resultado = {}
    let clave = null
    for (const linea of salida.split('\n')) {
        if (linea.startsWith(CENTINELA)) { clave = linea.slice(CENTINELA.length).trim(); resultado[clave] = []; continue }
        if (clave && linea.trim()) resultado[clave].push(linea.split('\t'))
    }
    return resultado
}

const shquote = (s) => `'${s.replace(/'/g, `'\\''`)}'`

/* --------------------------------------------------------------- utilidades */

// "2026-08-03" → "03 de Agosto 2026" (o sin "de", como usa Suitedo)
const fecha = (iso, conDe = true) => {
    if (!iso || iso === 'NULL' || iso.startsWith('0000')) return null
    const [a, m, d] = iso.slice(0, 10).split('-')
    return `${d}${conDe ? ' de' : ''} ${MES_TITULO[Number(m) - 1]} ${a}`
}

const limpiar = (s) => s.replace(/\s+/g, ' ').trim()
const esPrueba = (nombre) => /\b(prueba|test|testing|demo)\b/i.test(nombre)

/*
 * Correcciones de redacción aprobadas, por coincidencia exacta con el nombre capturado.
 * Existen porque el dato de producción trae erratas (letra O por cero, mayúsculas
 * sostenidas) y la presentación se proyecta en junta. La BD NO se toca: esto solo
 * cambia cómo se muestra. Al agregar una entrada, deja el original como clave.
 */
const CORRECCIONES = {
    'EGDOO2 - 21': 'EGD002 - 21',
    'CLIMA- HOTEL COLLI': 'Clima - Hotel Colli',
    'DNC- HOTEL COLLI': 'DNC - Hotel Colli',
    'FERRA MERCADO FERRETERO - DIAGNÓSTICO INICIAL': 'FERRA MERCADO FERRETERO - Diagnóstico Inicial',
    'Eje 5: Liderzago': 'Eje 5: Liderazgo',
    'DIAGNOSTICO INICIAL - DIFARVET': 'Diagnóstico inicial - Difarvet',
    'DIAGNÓSTICO INICIAL - GRUPO PONS (Porcicultor /Alimentos)': 'Diagnóstico inicial - Grupo Pons (porcicultor / alimentos)',
    'HUMANA 11 - DIAGNÓSTICO': 'Humana11 - Diagnóstico',
    'BACHILLERATO - LENGUA Y COMUNICACIÓN I': 'Bachillerato - Lengua y Comunicación I',
    'Masterclass - 07/10/2026 - Planeación Estegica': 'Masterclass - 07/10/2026 - Planeación Estratégica'
}

const corregidos = []
const corregir = (s) => {
    const fix = CORRECCIONES[s]
    if (fix) corregidos.push(`${s}  →  ${fix}`)
    return fix ?? s
}

/* ---------------------------------------------------------------- erratas */

const ortografia = nspell(diccionario)

// Palabras válidas que el diccionario no conoce: marcas, clientes, siglas largas.
const NOMBRES_PROPIOS = new Set([
    'humana', 'humana11', 'suitedo', 'uhe', 'egafi', 'difarvet', 'pons', 'colli', 'ferra',
    'masterclass', 'nps', 'nom', 'dnc', 'ia', 'porcicultor', 'bachillerato', 'online', 'coaching',
    // mexicanismos que el diccionario (es-ES) no trae
    'planeación', 'planeacion', 'gerencial'
])

const palabraOk = (w) => {
    if (w.length <= 2 || /\d/.test(w)) return true
    if (/^[A-ZÁÉÍÓÚÑ]+$/.test(w) && w.length <= 6) return true        // sigla
    const minus = w.toLowerCase()
    if (NOMBRES_PROPIOS.has(minus)) return true
    const capital = minus[0].toUpperCase() + minus.slice(1)
    return ortografia.correct(w) || ortografia.correct(minus) || ortografia.correct(capital)
}

// Devuelve las palabras dudosas de un texto (vacío si todo está bien).
const erratas = (texto) => [...new Set((texto.match(/[\p{L}\d]+/gu) ?? []).filter((w) => !palabraOk(w)))]

/* ---------------------------------------------------------------- consultas */

/*
 * Métricas de uso: se consultan para el periodo y para el anterior, con la misma SQL.
 * Todas son agregados (COUNT): ninguna devuelve nombres, correos ni textos libres.
 */
const sqlMetricas = (r) => {
    const rango = (col) => `${col} >= '${r.desde}' AND ${col} < '${r.hasta}'`
    return [
        // Suitedo — diagnostic_participants.status está invertido: 0 = terminado.
        { clave: 'aplicados', sql: `SELECT name FROM suitedo.diagnostic_applieds WHERE ${rango('start_datetime')}` },
        {
            clave: 'respondentes',
            sql: `SELECT COUNT(DISTINCT diagnostic_participant_id) FROM suitedo.diagnostic_participant_answers
                  WHERE ${rango('created_at')}`
        },
        {
            clave: 'terminados',
            // Sin fecha de término en la BD: se toma la última respuesta del participante.
            sql: `SELECT COUNT(*) FROM (
                    SELECT p.id FROM suitedo.diagnostic_participants p
                    JOIN suitedo.diagnostic_participant_answers a ON a.diagnostic_participant_id = p.id
                    WHERE p.status = 0 AND a.created_at >= '${r.desde}'
                    GROUP BY p.id
                    HAVING MAX(a.created_at) < '${r.hasta}'
                  ) t`
        },
        // UHE
        {
            clave: 'alumnos',
            sql: `SELECT COUNT(DISTINCT pid) FROM (
                    SELECT prg_participant_id pid FROM uhe.prg_participant_tc_quiz_attempts WHERE ${rango('created_at')}
                    UNION SELECT prg_participant_id FROM uhe.prg_participant_tc_survey_attempts WHERE ${rango('created_at')}
                    UNION SELECT prg_participant_id FROM uhe.prg_participant_tc_files WHERE ${rango('created_at')}
                    UNION SELECT prg_participant_id FROM uhe.prg_participant_module_progress WHERE ${rango('updated_at')}
                    UNION SELECT a.prg_participant_id FROM uhe.prg_participant_session_attendances a
                          JOIN uhe.prg_sessions s ON s.id = a.prg_session_id
                          WHERE a.attended = 1 AND ${rango('s.start_date')}
                  ) t`
        },
        { clave: 'inscripciones', sql: `SELECT COUNT(*) FROM uhe.prg_participants WHERE ${rango('created_at')}` },
        { clave: 'certificados', sql: `SELECT COUNT(*) FROM uhe.prg_participant_certificates WHERE ${rango('created_at')}` },
        { clave: 'programasN', sql: `SELECT COUNT(*) FROM uhe.prg_programs WHERE ${rango('created_at')}` },
        { clave: 'modulosN', sql: `SELECT COUNT(*) FROM uhe.prg_modules WHERE ${rango('start_date')}` },
        // Talento — assessment_candidates.completed_at nunca se escribe: se usa status + start_datetime.
        { clave: 'candidatos', sql: `SELECT COUNT(*) FROM talento.candidates WHERE ${rango('created_at')}` },
        { clave: 'vacantesN', sql: `SELECT COUNT(*) FROM talento.vacancies WHERE ${rango('created_at')}` },
        {
            clave: 'evaluados',
            sql: `SELECT COUNT(*) FROM talento.assessment_candidates
                  WHERE status = 'completed' AND ${rango('start_datetime')}`
        },
        {
            clave: 'encuestas',
            sql: `SELECT COUNT(*) FROM talento.diagnostic_applied_responses
                  WHERE status = 'completed' AND ${rango('completed_at')}`
        },
        // Página Web — blogs + Comunidad (posts de colaboradores y reconocimientos; sin automáticos).
        { clave: 'blogsN', sql: `SELECT COUNT(*) FROM humana11.resources WHERE published_at IS NOT NULL AND ${rango('published_at')}` },
        {
            clave: 'posts',
            sql: `SELECT COUNT(*), COUNT(DISTINCT user_id) FROM humana11.posts
                  WHERE deleted_at IS NULL AND type IN ('user', 'recognition') AND ${rango('created_at')}`
        },
        { clave: 'comentarios', sql: `SELECT COUNT(*) FROM humana11.post_comments WHERE deleted_at IS NULL AND ${rango('created_at')}` },
        {
            clave: 'reacciones',
            sql: `SELECT (SELECT COUNT(*) FROM humana11.post_reactions WHERE ${rango('created_at')})
                       + (SELECT COUNT(*) FROM humana11.post_comment_reactions WHERE ${rango('created_at')})`
        },
        // Criba — personas solo agregadas.
        { clave: 'mentores', sql: `SELECT COUNT(*) FROM criba.mentors WHERE ${rango('created_at')}` },
        { clave: 'evaluaciones', sql: `SELECT COUNT(*), COUNT(DISTINCT mentor_id) FROM criba.evaluations WHERE ${rango('created_at')}` },
        {
            clave: 'accesos',
            sql: `SELECT COALESCE(SUM(${rango('suitedo_access_at')}), 0) + COALESCE(SUM(${rango('uhe_access_at')}), 0)
                  FROM criba.mentors`
        }
    ]
}

// Registros con nombre (solo del periodo actual): lo que se lista en cada tarjeta.
const sqlRegistros = (r) => {
    const rango = (col) => `${col} >= '${r.desde}' AND ${col} < '${r.hasta}'`
    return [
        {
            clave: 'suitedo',
            // Se agrupa por nombre: una misma aplicación puede repetirse (p. ej. NOM-035 x3).
            sql: `SELECT name, COUNT(*), MIN(DATE(start_datetime)), MAX(DATE(end_datetime))
                  FROM suitedo.diagnostic_applieds
                  WHERE ${rango('start_datetime')}
                  GROUP BY name ORDER BY MIN(start_datetime)`
        },
        {
            clave: 'blogs',
            sql: `SELECT DATE(published_at), title FROM humana11.resources
                  WHERE published_at IS NOT NULL AND ${rango('published_at')}
                  ORDER BY published_at DESC`
        },
        {
            clave: 'blogsBorrador',
            // Diagnóstico: recursos dados de alta en el periodo que aún no tienen published_at.
            sql: `SELECT COUNT(*) FROM humana11.resources WHERE published_at IS NULL AND ${rango('created_at')}`
        },
        {
            clave: 'programas',
            // prg_programs.start_date está NULL en toda la tabla: se fecha por created_at.
            sql: `SELECT DATE(created_at), name FROM uhe.prg_programs WHERE ${rango('created_at')} ORDER BY created_at`
        },
        {
            clave: 'modulos',
            sql: `SELECT DATE(start_date), DATE(final_date), name FROM uhe.prg_modules
                  WHERE ${rango('start_date')} ORDER BY start_date`
        },
        {
            clave: 'vacantes',
            // published_at está NULL en todas las filas y updated_at trae un update masivo.
            sql: `SELECT DATE(created_at), status, name FROM talento.vacancies WHERE ${rango('created_at')} ORDER BY created_at`
        },
        { clave: 'hoy', sql: `SELECT CURDATE()` }
    ]
}

const construir = (p) => {
    const sufijo = (bloques, s) => bloques.map((b) => ({ ...b, clave: b.clave + s }))
    const datos = consultar([
        ...sqlRegistros(p),
        ...sufijo(sqlMetricas(p.metricas), '_act'),
        ...sufijo(sqlMetricas(p.anterior), '_ant')
    ])

    const hoy = datos.hoy?.[0]?.[0] ?? new Date().toISOString().slice(0, 10)
    const descartados = []
    const nulo = (v) => (v === undefined || v === 'NULL' ? 0 : Number(v))
    const celda = (clave, col = 0) => nulo(datos[clave]?.[0]?.[col])

    // Estado por fechas ISO: aún no empieza / ya terminó / en curso.
    const estado = (ini, fin) => {
        if (ini && ini > hoy) return 'Programado'
        if (fin && fin !== 'NULL' && fin < hoy) return 'Completado'
        return 'En curso'
    }

    /* Registros */
    const suitedo = []
    for (const [nombre, apps, ini, fin] of datos.suitedo ?? []) {
        const limpio = corregir(limpiar(nombre))
        if (esPrueba(limpio)) { descartados.push(`Suitedo · ${limpio} (${ini})`); continue }
        const n = Number(apps)
        suitedo.push({
            name: n > 1 ? `${limpio} (${n} aplicaciones)` : limpio,
            date_start: fecha(ini, false),
            date_end: fecha(fin, false),
            status: estado(ini, fin)
        })
    }

    const web = (datos.blogs ?? []).map(([pub, titulo]) => ({
        name: `Entrada Blog | ${corregir(limpiar(titulo))}`,
        date_start: fecha(pub),
        date_end: null,
        status: 'Publicado'
    }))

    const uhe = [
        ...(datos.programas ?? []).map(([alta, nombre]) => ({
            name: `Programa | ${corregir(limpiar(nombre))}`,
            date_start: fecha(alta),
            date_end: null,
            status: 'En curso'
        })),
        ...(datos.modulos ?? []).map(([ini, fin, nombre]) => ({
            name: `Módulo | ${corregir(limpiar(nombre))}`,
            date_start: fecha(ini),
            date_end: fecha(fin),
            status: estado(ini, fin)
        }))
    ]

    const ESTADO_VACANTE = { published: 'Activo', closed: 'Cerrado', draft: 'Borrador' }
    const talento = (datos.vacantes ?? []).map(([alta, est, nombre]) => ({
        name: `Vacante | ${corregir(limpiar(nombre))}`,
        date_start: fecha(alta),
        date_end: null,
        status: ESTADO_VACANTE[est] ?? 'Activo'
    }))

    /* Métricas: { label, value, prev, hint?, destacada?, personas? } */
    const m = (label, clave, col = 0, extra = {}) => ({
        label, value: celda(`${clave}_act`, col), prev: celda(`${clave}_ant`, col), ...extra
    })
    const sinPruebas = (clave) => (datos[clave] ?? []).filter(([nombre]) => !esPrueba(limpiar(nombre ?? ''))).length

    const metricas = {
        suitedo: [
            m('Personas que respondieron', 'respondentes', 0, { destacada: true, personas: true }),
            m('Cuestionarios terminados', 'terminados'),
            { label: 'Diagnósticos aplicados', value: sinPruebas('aplicados_act'), prev: sinPruebas('aplicados_ant') }
        ],
        uhe: [
            m('Alumnos activos', 'alumnos', 0, { destacada: true, personas: true, hint: 'con actividad, asistencia o avance' }),
            m('Inscripciones nuevas', 'inscripciones'),
            m('Certificados emitidos', 'certificados'),
            m('Módulos iniciados', 'modulosN'),
            m('Programas nuevos', 'programasN')
        ],
        talento: [
            m('Candidatos nuevos', 'candidatos', 0, { destacada: true, personas: true }),
            m('Evaluaciones completadas', 'evaluados', 0, { hint: 'assessment center' }),
            m('Encuestas respondidas', 'encuestas', 0, { personas: true }),
            m('Vacantes abiertas', 'vacantesN')
        ],
        web: [
            m('Posts en Comunidad', 'posts', 0, { destacada: true, hint: 'publicaciones y reconocimientos' }),
            m('Personas que publicaron', 'posts', 1, { personas: true }),
            m('Comentarios', 'comentarios'),
            m('Reacciones', 'reacciones'),
            m('Blogs publicados', 'blogsN')
        ],
        criba: [
            m('Mentores nuevos', 'mentores', 0, { personas: true }),
            m('Evaluaciones a mentores', 'evaluaciones'),
            m('Cuentas creadas', 'accesos', 0, { hint: 'en SuiteDO y UHE' })
        ]
    }

    // Revisión de redacción: mayúsculas sostenidas y palabras fuera del diccionario.
    const PREFIJO = /^(Entrada Blog|Programa|Módulo|Vacante) \| /
    // Una palabra en mayúsculas de 7+ letras o dos seguidas: «EGAFI Ventas» pasa, «GRUPO PONS» no.
    const GRITO = /(?<!\p{L})(\p{Lu}{7,}|\p{Lu}{3,}[\s\-]+\p{Lu}{3,})(?!\p{Ll})/u
    const revisar = []
    for (const r of [...suitedo, ...web, ...uhe, ...talento]) {
        const texto = r.name.replace(PREFIJO, '').replace(/ \(\d+ aplicaciones\)$/, '')
        const motivos = []
        if (GRITO.test(texto)) motivos.push('mayúsculas')
        const dudosas = erratas(texto)
        if (dudosas.length) motivos.push(`¿errata?: ${dudosas.join(', ')}`)
        if (motivos.length) revisar.push(`${texto}  [${motivos.join(' · ')}]`)
    }

    return {
        registros: { suitedo, web, uhe, talento, criba: [] },
        metricas, descartados, revisar, corregidos, hoy,
        blogsBorrador: celda('blogsBorrador')
    }
}

/* ----------------------------------------------------------------- archivo */

const PLATAFORMAS = [
    { id: 1, name: 'Suitedo', img: 'https://suitedo.com/resources/suitedo-logo.png', description: 'Plataforma de desarrollo organizacional', clave: 'suitedo' },
    { id: 2, name: 'Página Web', img: 'https://humana11.com/img/logos/humana11.webp', description: 'Página web y Comunidad de Humana11', clave: 'web' },
    { id: 3, name: 'UHE', img: 'https://universidadhumanaempresaria.com/UHE/isotipoUHE_Sinfondo.png', description: 'Universidad Humana Empresaria', clave: 'uhe' },
    { id: 4, name: 'Talento', img: 'https://talento11.com/img/talento.png', description: 'Reclutamiento y assessment psicométrico', clave: 'talento' },
    { id: 5, name: 'Criba de Mentores', img: 'https://humana11.com/img/logos/humana11.webp', description: 'Padrón y evaluación de mentores', clave: 'criba' }
]

const generar = (datos, periodo) => {
    const registro = (r) => [
        '            {',
        `                "name": ${JSON.stringify(r.name)},`,
        `                "date_start": ${JSON.stringify(r.date_start)},`,
        `                "date_end": ${r.date_end === null ? 'null' : JSON.stringify(r.date_end)},`,
        `                "status": ${JSON.stringify(r.status)}`,
        '            }'
    ].join('\n')

    const objeto = (x) => `{ ${Object.entries(x).filter(([, v]) => v !== null).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} }`
    const metrica = (x) => `            ${objeto(x)}`

    const bloques = PLATAFORMAS.map((p) => [
        '    {',
        `        id: ${p.id},`,
        `        name: ${JSON.stringify(p.name)},`,
        `        img: ${JSON.stringify(p.img)},`,
        `        description: ${JSON.stringify(p.description)},`,
        '        metrics: [',
        datos.metricas[p.clave].map(metrica).join(',\n'),
        '        ],',
        '        records: [',
        datos.registros[p.clave].map(registro).join(',\n'),
        '        ]',
        '    }'
    ].join('\n')).join(',\n')

    return `// Actividad de ${periodo.etiqueta}, comparada con ${periodo.anterior.etiqueta}. Consultada el ${datos.hoy}
// contra las BD del ecosistema en 216.238.86.245. Solo lectura, métricas agregadas.
//   metrics → cifras de uso del periodo (value) y del periodo anterior (prev)
//   records → elementos con nombre del periodo: diagnósticos, blogs, programas, módulos, vacantes
// Generado por scripts/uso-plataformas.mjs — no editar a mano si vas a regenerarlo.
export const periodo = ${objeto({ etiqueta: periodo.etiqueta, corte: periodo.corte, anterior: periodo.anterior.etiqueta })};

export const platforms = [
${bloques}
];
`
}

/* -------------------------------------------------------------------- main */

const delta = (v, prev) => {
    if (!prev) return v ? 'nuevo' : '='
    const pct = Math.round(((v - prev) / prev) * 100)
    return pct === 0 ? '=' : `${pct > 0 ? '+' : ''}${pct}%`
}

const main = () => {
    const args = process.argv.slice(2)
    const dryRun = args.includes('--dry-run')
    const texto = args.filter((a) => !a.startsWith('--')).join(' ')

    if (!texto) {
        console.error('Uso: node scripts/uso-plataformas.mjs "agosto + septiembre 2026" [--dry-run]')
        process.exit(1)
    }

    const periodo = parsePeriodo(texto)
    console.log(`Periodo: ${periodo.etiqueta}  [${periodo.desde} → ${periodo.hasta})`)
    if (periodo.corte) console.log(`Métricas: ${periodo.metricas.desde} → ${periodo.metricas.hasta}  (periodo abierto, ${periodo.corte})`)
    console.log(`Compara: ${periodo.anterior.etiqueta}  [${periodo.anterior.desde} → ${periodo.anterior.hasta})`)

    const datos = construir(periodo)
    const contenido = generar(datos, periodo)

    if (dryRun) {
        console.log(contenido)
    } else {
        writeFileSync(DESTINO, contenido)
        console.log(`Escrito ${path.relative(RAIZ, DESTINO)}`)
    }

    console.log('')
    console.log('## Métricas (actual · anterior · variación)')
    for (const p of PLATAFORMAS) {
        console.log(p.name)
        for (const x of datos.metricas[p.clave]) {
            console.log(`  ${x.destacada ? '★' : ' '} ${x.label.padEnd(28)} ${String(x.value).padStart(5)} · ${String(x.prev).padStart(5)} · ${delta(x.value, x.prev)}`)
        }
        console.log(`    registros con nombre: ${datos.registros[p.clave].length}`)
    }
    const personas = Object.values(datos.metricas).flat().filter((x) => x.personas).reduce((a, x) => a + x.value, 0)
    console.log(`Personas activas (suma por plataforma): ${personas}`)
    console.log(`Recursos web creados sin publicar: ${datos.blogsBorrador}`)

    if (datos.descartados.length) {
        console.log('')
        console.log('## Descartados por parecer pruebas')
        datos.descartados.forEach((d) => console.log(`- ${d}`))
    }
    if (datos.corregidos.length) {
        console.log('')
        console.log('## Correcciones de redacción aplicadas (CORRECCIONES en el script)')
        datos.corregidos.forEach((c) => console.log(`- ${c}`))
    }
    if (datos.revisar.length) {
        console.log('')
        console.log('## Revisar redacción')
        datos.revisar.forEach((n) => console.log(`- ${n}`))
    }
    if (!personas && !Object.values(datos.registros).flat().length) {
        console.log('')
        console.log('AVISO: el periodo no devolvió actividad.')
    }
}

main()
