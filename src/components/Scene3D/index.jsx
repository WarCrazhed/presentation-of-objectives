import { useEffect, useRef } from 'react'

// Fondo: olas fluidas estilo macOS Big Sur (canvas 2D).
// Bandas de onda apiladas con relleno en degradado translúcido que ondulan y se superponen.
// Sobrio y elegante para presentación ejecutiva. Firma { currentSlide, totalSlides } intacta.

// Paleta por sección, alineada con los gradientes de título de cada slide.
const PALETTE = ['#ec4899', '#6366f1', '#a855f7', '#84cc16', '#f97316', '#06b6d4', '#818cf8', '#84cc16']

// Capas de ola (de atrás hacia adelante). pos = posición vertical base (fracción de alto).
const LAYERS = [
    { pos: 0.30, amp: 26, freq: 0.0016, speed: 0.18, phase: 0.0, tint: 0.45, alpha: 0.16 },
    { pos: 0.42, amp: 34, freq: 0.0020, speed: 0.24, phase: 1.1, tint: 0.20, alpha: 0.18 },
    { pos: 0.54, amp: 30, freq: 0.0014, speed: 0.30, phase: 2.3, tint: 0.00, alpha: 0.20 },
    { pos: 0.66, amp: 40, freq: 0.0022, speed: 0.20, phase: 3.4, tint: -0.20, alpha: 0.22 },
    { pos: 0.80, amp: 32, freq: 0.0018, speed: 0.27, phase: 4.6, tint: -0.38, alpha: 0.26 },
]

export const Scene3D = ({ currentSlide = 0 }) => {
    const canvasRef = useRef(null)
    const slideRef = useRef(currentSlide)

    useEffect(() => {
        slideRef.current = currentSlide
    }, [currentSlide])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

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
        const accent = { r: 132, g: 204, b: 22 }
        const hexToRgb = (hex) => ({
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16),
        })
        // tint > 0 aclara hacia blanco, tint < 0 oscurece hacia negro.
        const shade = (c, t) => (t >= 0 ? c + (255 - c) * t : c * (1 + t))

        let last = 0, elapsed = 0, frameId

        const edgeAt = (x, L, t) =>
            L.amp * Math.sin(x * L.freq + t * L.speed + L.phase) +
            L.amp * 0.45 * Math.sin(x * L.freq * 2.3 - t * L.speed * 0.7 + L.phase * 1.7)

        const draw = (now) => {
            frameId = requestAnimationFrame(draw)
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
            last = now
            if (!reducedMotion) elapsed += dt
            const t = elapsed

            const target = hexToRgb(PALETTE[slideRef.current % PALETTE.length])
            accent.r += (target.r - accent.r) * Math.min(dt * 1.5, 1)
            accent.g += (target.g - accent.g) * Math.min(dt * 1.5, 1)
            accent.b += (target.b - accent.b) * Math.min(dt * 1.5, 1)
            const R = accent.r | 0, G = accent.g | 0, B = accent.b | 0

            const isDark = document.documentElement.classList.contains('dark')

            ctx.clearRect(0, 0, width, height)

            for (let li = 0; li < LAYERS.length; li++) {
                const L = LAYERS[li]
                const baseY = height * L.pos

                // Color de la capa: tinte del acento; en dark se oscurece un poco más.
                const tint = isDark ? L.tint - 0.15 : L.tint
                const cr = shade(R, tint) | 0
                const cg = shade(G, tint) | 0
                const cb = shade(B, tint) | 0
                const a = isDark ? L.alpha + 0.06 : L.alpha

                // Relleno vertical: opaco arriba (cresta) → transparente hacia abajo.
                const g2 = ctx.createLinearGradient(0, baseY - L.amp, 0, height)
                g2.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`)
                g2.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)

                ctx.fillStyle = g2
                ctx.beginPath()
                ctx.moveTo(-20, height + 20)
                for (let x = -20; x <= width + 20; x += 12) {
                    ctx.lineTo(x, baseY + edgeAt(x, L, t))
                }
                ctx.lineTo(width + 20, height + 20)
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
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#eef2f8] dark:bg-[#0a0a12]"
            aria-hidden="true"
        >
            {/* Olas fluidas estilo Big Sur (blur leve → suavidad) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full blur-[2px]" />
        </div>
    )
}
