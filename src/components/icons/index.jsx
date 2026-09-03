/*
 * Iconografía de la presentación: SVG de trazo sobre rejilla de 24, grosor 1.7.
 * Sustituye a los emoji: escalan, heredan color y no cambian entre sistemas.
 */
const Icon = ({ children, className = 'size-4', strokeWidth = 1.7 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        {children}
    </svg>
)

export const LogoMark = (props) => (
    <Icon {...props} strokeWidth={2.2}>
        <path d="M12 3v18" />
        <path d="M5 8l7-5 7 5" />
        <path d="M5 16l7 5 7-5" />
    </Icon>
)

export const ChevronLeft = (props) => (
    <Icon {...props} strokeWidth={2}><path d="M15 19l-7-7 7-7" /></Icon>
)

export const ChevronRight = (props) => (
    <Icon {...props} strokeWidth={2}><path d="M9 5l7 7-7 7" /></Icon>
)

export const ChevronDown = (props) => (
    <Icon {...props} strokeWidth={2}><path d="M6 9l6 6 6-6" /></Icon>
)

export const ArrowRight = (props) => (
    <Icon {...props} strokeWidth={2.2}><path d="M5 12h13M13 6l6 6-6 6" /></Icon>
)

export const Search = (props) => (
    <Icon {...props} strokeWidth={2}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
    </Icon>
)

export const Close = (props) => (
    <Icon {...props} strokeWidth={2}><path d="M6 6l12 12M18 6L6 18" /></Icon>
)

export const Lock = (props) => (
    <Icon {...props}>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
    </Icon>
)

export const Eye = (props) => (
    <Icon {...props}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.6" />
    </Icon>
)

export const Alert = (props) => (
    <Icon {...props} strokeWidth={1.9}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16.2v.1" />
    </Icon>
)

export const Calendar = (props) => (
    <Icon {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
)

export const Cloud = (props) => (
    <Icon {...props}><path d="M17.5 19H7a4.5 4.5 0 010-9 6 6 0 0111.6 2A3.5 3.5 0 0117.5 19z" /></Icon>
)

export const Users = (props) => (
    <Icon {...props}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 19a6 6 0 0112 0M16 11a3 3 0 100-6M17 19a5.5 5.5 0 00-1.4-3.6" />
    </Icon>
)

export const Mail = (props) => (
    <Icon {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
    </Icon>
)

export const Sparkle = (props) => (
    <Icon {...props}><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" /></Icon>
)

export const Bot = (props) => (
    <Icon {...props}>
        <rect x="4" y="6" width="16" height="13" rx="3" />
        <path d="M9 11v2M15 11v2M9.5 16h5M12 6V3" />
    </Icon>
)

export const Drive = (props) => (
    <Icon {...props}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h5M7 14h9" />
    </Icon>
)

export const Diskette = (props) => (
    <Icon {...props}>
        <path d="M4 6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
        <path d="M8 4v5h6V4" />
        <path d="M7 20v-6h10v6" />
    </Icon>
)

export const Cap = (props) => (
    <Icon {...props}>
        <path d="M3 8l9-4 9 4-9 4-9-4z" />
        <path d="M7 10.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5.5" />
    </Icon>
)

export const Doc = (props) => (
    <Icon {...props}>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
    </Icon>
)

export const Briefcase = (props) => (
    <Icon {...props}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 12h18" />
    </Icon>
)

export const Megaphone = (props) => (
    <Icon {...props}>
        <path d="M4 10v4a1 1 0 001 1h3l7 4V5L8 9H5a1 1 0 00-1 1z" />
        <path d="M18 9.5a3.5 3.5 0 010 5" />
    </Icon>
)

export const Chart = (props) => (
    <Icon {...props}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </Icon>
)
