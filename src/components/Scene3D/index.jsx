import { useEffect, useRef } from 'react'

// Fondo: olas fluidas estilo macOS Big Sur (canvas 2D).
// Capas de onda con curvas Bézier suavizadas + relleno en degradado lime; blur fuerte → look cremoso/soñado.
// Marca lime sobre base blanca/negra. Firma { currentSlide, totalSlides } intacta.

// Capas agrupadas arriba y abajo → centro despejado para el contenido.
// side: 'top' rellena hacia arriba, 'bottom' hacia abajo.
const LAYERS = [
    // Arriba
    { posY: 0.06, amp: 40, speed: 0.10, phase: 0.0, color: '#bef264', alpha: 0.30, side: 'top' },    // lime-300
    { posY: 0.15, amp: 54, speed: 0.13, phase: 1.2, color: '#a3e635', alpha: 0.36, side: 'top' },    // lime-400
    { posY: 0.24, amp: 46, speed: 0.09, phase: 2.5, color: '#84cc16', alpha: 0.44, side: 'top' },    // lime-500
    // Abajo
    { posY: 0.76, amp: 46, speed: 0.11, phase: 3.7, color: '#84cc16', alpha: 0.44, side: 'bottom' }, // lime-500
    { posY: 0.85, amp: 54, speed: 0.12, phase: 4.9, color: '#65a30d', alpha: 0.48, side: 'bottom' }, // lime-600
    { posY: 0.94, amp: 40, speed: 0.10, phase: 5.8, color: '#4d7c0f', alpha: 0.55, side: 'bottom' }, // lime-700
]

const STEP = 46 // muestreo horizontal (grueso: el blur suaviza)

export const Scene3D = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const hexToRgb = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
        })
        const RGB = LAYERS.map((L) => hexToRgb(L.color))

        let width = 0, height = 0

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2)
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener('resize', resize)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const edgeAt = (x, L, t) =>
            L.amp * (0.7 * Math.sin(x * 0.0016 + t * L.speed * 6 + L.phase) +
                     0.3 * Math.sin(x * 0.0031 - t * L.speed * 4 + L.phase * 1.6))

        let last = 0, elapsed = 0, frameId

        const draw = (now) => {
            frameId = requestAnimationFrame(draw)
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
            last = now
            if (!reducedMotion) elapsed += dt
            const t = elapsed

            const isDark = document.documentElement.classList.contains('dark')

            ctx.clearRect(0, 0, width, height)

            for (let li = 0; li < LAYERS.length; li++) {
                const L = LAYERS[li]
                const { r, g, b } = RGB[li]
                const baseY = height * L.posY
                const a = isDark ? Math.min(L.alpha + 0.15, 0.95) : Math.min(L.alpha + 0.30, 0.9)

                // Muestrear el borde superior de la ola.
                const pts = []
                for (let x = -STEP; x <= width + STEP; x += STEP) {
                    pts.push({ x, y: baseY + edgeAt(x, L, t) })
                }

                const top = L.side === 'top'
                // Relleno concentrado cerca de la cresta (lado del centro) → banda visible.
                const grad = top
                    ? ctx.createLinearGradient(0, baseY + L.amp, 0, baseY - 220)
                    : ctx.createLinearGradient(0, baseY - L.amp, 0, baseY + 220)
                grad.addColorStop(0, `rgba(${r},${g},${b},${a})`)
                grad.addColorStop(0.55, `rgba(${r},${g},${b},${a * 0.55})`)
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
                ctx.fillStyle = grad

                // Curva suave (Bézier cuadrática por puntos medios) → borde sedoso Big Sur.
                const edgeY = top ? -STEP : height + STEP
                ctx.beginPath()
                ctx.moveTo(-STEP, edgeY)
                ctx.lineTo(pts[0].x, pts[0].y)
                for (let i = 0; i < pts.length - 1; i++) {
                    const xc = (pts[i].x + pts[i + 1].x) / 2
                    const yc = (pts[i].y + pts[i + 1].y) / 2
                    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc)
                }
                ctx.lineTo(width + STEP, edgeY)
                ctx.closePath()
                ctx.fill()
            }
        }
        frameId = requestAnimationFrame(draw)

        const onVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(frameId)
            } else {
                last = 0
                frameId = requestAnimationFrame(draw)
            }
        }
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f7f7f5] dark:bg-[#0a0a12]"
            aria-hidden="true"
        >
            {/* Olas Big Sur (blur medio → cremoso pero visible) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-linear-to-b from-lime-500/50 via-white to-lime-500/50 dark:bg-linear-to-b dark:from-transparent dark:via-transparent dark:to-transparent" />
        </div>
    )
}
