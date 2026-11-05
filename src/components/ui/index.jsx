import { Close, Search } from '../icons'

/*
 * Piezas compartidas por los slides. Todas usan los tokens de src/index.css,
 * así que el modo claro y el oscuro salen de las mismas clases.
 */

// Encabezado de slide: numeral, título y bajada. Sin gradientes: la jerarquía es el tamaño.
export const SlideHeader = ({ number, eyebrow, title, description, children }) => (
    <div className="text-halo flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="text-scrim flex flex-col gap-1.5">
            {eyebrow && (
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {number} · {eyebrow}
                </p>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
            {description && <p className="max-w-2xl text-sm text-muted md:text-base">{description}</p>}
        </div>
        {children}
    </div>
)

// Tira de cifras. Las celdas se separan con el propio borde, no con sombras.
export const StatStrip = ({ children, className = '' }) => (
    <div className={`grid gap-px overflow-hidden rounded-lg border border-line glass ${className}`}>
        {children}
    </div>
)

export const Stat = ({ label, value, hint, accent = false, className = '' }) => (
    <div className={`flex flex-col gap-1.5 cell-divider px-5 py-4 ${className}`}>
        <p className="text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
        <p className={`num text-2xl font-medium tracking-tight ${accent ? 'text-accent' : 'text-ink'}`}>{value}</p>
        {hint && <p className="font-mono text-[10px] text-faint">{hint}</p>}
    </div>
)

// Estado: punto + palabra. Nunca solo color, para que se lea en daltonismo y en gris.
const statusTone = {
    Completado: 'text-ok bg-ok-bg',
    Publicado: 'text-info bg-info-bg',
    Activo: 'text-teal bg-teal-bg',
    'En curso': 'text-warn bg-warn-bg',
    Programado: 'bg-panel-2 text-muted',
    Cerrado: 'text-danger bg-danger-bg'
}

/*
 * Variación contra el periodo anterior. Flecha + texto (no solo color).
 * Con base chica (< 10) se muestra la diferencia absoluta: «+23» dice más que «+1150%».
 */
export const Delta = ({ value, prev, format = String, invert = false }) => {
    const diff = value - prev
    let tone = 'text-dim'
    let label = '= igual'
    if (!prev && value) {
        tone = 'text-info'
        label = 'nuevo'
    } else if (diff) {
        // invert: para gastos, subir es malo.
        tone = (diff > 0) !== invert ? 'text-ok' : 'text-danger'
        const cifra = prev < 10 ? format(Math.abs(diff)) : `${Math.abs(Math.round((diff / prev) * 100))}%`
        label = `${diff > 0 ? '▲ +' : '▼ −'}${cifra}`
    }
    return (
        <span className={`num whitespace-nowrap font-mono text-[10px] ${tone}`} title={`Periodo anterior: ${format(prev)}`}>
            {label}
        </span>
    )
}

export const StatusChip = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded px-2 py-0.5 text-[10px] ${statusTone[status] ?? 'bg-panel-2 text-muted'}`}>
        <span className="size-1.5 rounded-full bg-current" />
        {status}
    </span>
)

export const SearchField = ({ value, onChange, placeholder }) => (
    <div className="relative w-full md:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-dim" />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-line bg-panel py-2 pl-9 pr-9 text-xs text-ink placeholder-dim focus:border-accent focus:outline-none"
        />
        {value && (
            <button
                type="button"
                onClick={() => onChange('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dim transition-colors hover:text-ink"
            >
                <Close className="size-3.5" />
            </button>
        )}
    </div>
)

export const FootNote = ({ children }) => (
    <p className="text-halo text-right font-mono text-[10px] text-dim">{children}</p>
)
