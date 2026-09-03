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
export const parsePeriodo = (texto) => {
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

    return {
        anio: Number(anio),
        desde: `${anio}-${dos(primero)}-01`,
        hasta: ultimo === 11 ? `${Number(anio) + 1}-01-01` : `${anio}-${dos(ultimo + 1)}-01`,
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
    'Eje 5: Liderzago': 'Eje 5: Liderazgo'
}

const corregidos = []
const corregir = (s) => {
    const fix = CORRECCIONES[s]
    if (fix) corregidos.push(`${s}  →  ${fix}`)
    return fix ?? s
}

/* ---------------------------------------------------------------- consultas */

const construir = (p) => {
    const rango = (col) => `${col} >= '${p.desde}' AND ${col} < '${p.hasta}'`

    const datos = consultar([
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
            clave: 'programas',
            // prg_programs.start_date está NULL en toda la tabla: se fecha por created_at.
            sql: `SELECT DATE(created_at), name FROM uhe.prg_programs
                  WHERE ${rango('created_at')} ORDER BY created_at`
        },
        {
            clave: 'modulos',
            sql: `SELECT DATE(start_date), DATE(final_date), name FROM uhe.prg_modules
                  WHERE ${rango('start_date')} ORDER BY start_date`
        },
        {
            clave: 'vacantes',
            // published_at está NULL en todas las filas y updated_at trae un update masivo:
            // created_at es la única columna fiable para fechar una vacante.
            sql: `SELECT DATE(created_at), status, name FROM talento.vacancies
                  WHERE ${rango('created_at')} ORDER BY created_at`
        },
        {
            clave: 'candidatos',
            sql: `SELECT COUNT(*), MIN(DATE(created_at)), MAX(DATE(created_at))
                  FROM talento.candidates WHERE ${rango('created_at')}`
        },
        { clave: 'hoy', sql: `SELECT CURDATE()` }
    ])

    const hoy = datos.hoy?.[0]?.[0] ?? new Date().toISOString().slice(0, 10)
    const descartados = []

    /* Suitedo — diagnósticos aplicados */
    const suitedo = []
    for (const [nombre, apps, ini, fin] of datos.suitedo ?? []) {
        const limpio = corregir(limpiar(nombre))
        if (esPrueba(limpio)) { descartados.push(`Suitedo · ${limpio} (${ini})`); continue }
        const n = Number(apps)
        suitedo.push({
            name: n > 1 ? `${limpio} (${n} aplicaciones)` : limpio,
            date_start: fecha(ini, false),
            date_end: fecha(fin, false),
            status: fin && fin < hoy ? 'Completado' : 'En Proceso'
        })
    }

    /* Página Web — entradas de blog */
    const web = (datos.blogs ?? []).map(([pub, titulo]) => ({
        name: `Entrada Blog | ${corregir(limpiar(titulo))}`,
        date_start: fecha(pub),
        date_end: null,
        status: 'Publicado'
    }))

    /* UHE — programas creados + módulos que inician en el periodo */
    const uhe = [
        ...(datos.programas ?? []).map(([alta, nombre]) => ({
            name: `Programa | ${corregir(limpiar(nombre))}`,
            date_start: fecha(alta),
            date_end: null,
            status: 'Activo'
        })),
        ...(datos.modulos ?? []).map(([ini, fin, nombre]) => ({
            name: `Módulo | ${corregir(limpiar(nombre))}`,
            date_start: fecha(ini),
            date_end: fecha(fin),
            status: 'Activo'
        }))
    ]

    /* Talento — vacantes + alta agregada de candidatos */
    const ESTADO_VACANTE = { published: 'Activo', closed: 'Cerrado', draft: 'En Proceso' }
    const talento = (datos.vacantes ?? []).map(([alta, estado, nombre]) => ({
        name: `Vacante | ${corregir(limpiar(nombre))}`,
        date_start: fecha(alta),
        date_end: null,
        status: ESTADO_VACANTE[estado] ?? 'Activo'
    }))

    const [total, desdeC, hastaC] = datos.candidatos?.[0] ?? ['0']
    if (Number(total) > 0) {
        talento.push({
            name: `Candidatos | ${total} nuevos candidatos registrados`,
            date_start: fecha(desdeC),
            date_end: fecha(hastaC),
            status: 'Activo'
        })
    }

    // Nombres que conviene revisar a ojo antes de presentar (no se tocan automáticamente).
    const revisar = [...suitedo, ...web, ...uhe, ...talento]
        .map((r) => r.name)
        .filter((n) => /[A-ZÁÉÍÓÚÑ]{4,}/.test(n.replace(/^(Entrada Blog|Programa|Módulo|Vacante|Candidatos) \| /, '')))

    return { suitedo, web, uhe, talento, descartados, revisar, corregidos, hoy }
}

/* ----------------------------------------------------------------- archivo */

const PLATAFORMAS = [
    { id: 1, name: 'Suitedo', img: 'https://suitedo.com/resources/suitedo-logo.png', description: 'Plataforma de desarrollo organizacional', clave: 'suitedo' },
    { id: 2, name: 'Página Web', img: 'https://humana11.com/img/logos/humana11.webp', description: 'Página web de Humana11', clave: 'web' },
    { id: 3, name: 'UHE', img: 'https://universidadhumanaempresaria.com/UHE/isotipoUHE_Sinfondo.png', description: 'Universidad Humana Empresaria', clave: 'uhe' },
    { id: 4, name: 'Talento', img: 'https://talento11.com/img/talento.png', description: 'Reclutamiento y assessment psicométrico', clave: 'talento' }
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

    const bloques = PLATAFORMAS.map((p) => [
        '    {',
        `        id: ${p.id},`,
        `        name: ${JSON.stringify(p.name)},`,
        `        img: ${JSON.stringify(p.img)},`,
        `        description: ${JSON.stringify(p.description)},`,
        '        records: [',
        datos[p.clave].map(registro).join(',\n'),
        '        ]',
        '    }'
    ].join('\n')).join(',\n')

    return `// Actividad de ${periodo.etiqueta}, consultada el ${datos.hoy} contra las BD del
// ecosistema en 216.238.86.245 (suitedo, humana11, uhe, talento). Solo lectura.
//   Suitedo    → diagnostic_applieds con start_datetime en el periodo
//   Página Web → resources con published_at en el periodo
//   UHE        → prg_programs creados + prg_modules que inician en el periodo
//   Talento    → vacancies creadas en el periodo + alta de candidates agregada
// Generado por scripts/uso-plataformas.mjs — no editar a mano si vas a regenerarlo.
export const platforms = [
${bloques}
];
`
}

/* -------------------------------------------------------------------- main */

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

    const datos = construir(periodo)
    const contenido = generar(datos, periodo)

    if (dryRun) {
        console.log(contenido)
    } else {
        writeFileSync(DESTINO, contenido)
        console.log(`Escrito ${path.relative(RAIZ, DESTINO)}`)
    }

    const total = datos.suitedo.length + datos.web.length + datos.uhe.length + datos.talento.length
    console.log('')
    console.log('## Registros')
    console.log(`Suitedo      ${datos.suitedo.length}  (${datos.suitedo.filter((r) => r.status === 'En Proceso').length} en proceso, ${datos.suitedo.filter((r) => r.status === 'Completado').length} completados)`)
    console.log(`Página Web   ${datos.web.length}`)
    console.log(`UHE          ${datos.uhe.length}  (${datos.uhe.filter((r) => r.name.startsWith('Programa')).length} programas, ${datos.uhe.filter((r) => r.name.startsWith('Módulo')).length} módulos)`)
    console.log(`Talento      ${datos.talento.length}`)
    console.log(`TOTAL        ${total}`)

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
        console.log('## Revisar redacción (mayúsculas sostenidas o capturas raras)')
        datos.revisar.forEach((n) => console.log(`- ${n}`))
    }
    if (!total) {
        console.log('')
        console.log('AVISO: el periodo no devolvió ningún registro.')
    }
}

main()
