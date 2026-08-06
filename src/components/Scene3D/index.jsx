import { useEffect, useRef } from 'react'

// Fondo: olas de líneas finas (topografía animada, canvas 2D).
// Curvas horizontales delgadas que ondulan con ondas viajeras → sensación premium y fluida.
// Marca lime sobre base blanca/negra. Firma { currentSlide, totalSlides } intacta.

const LIME = { r: 132, g: 204, b: 22 } // lime-500

const ROW_GAP = 30   // separación vertical entre líneas (px)
const STEP = 8       // muestreo horizontal (px) — fino = curva suave
const AMP = 15       // amplitud base de la ondulación (px)

export const Scene3D = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        let width = 0, height = 0
        let rowYs = []
        let xs = []

        const build = () => {
            rowYs = []
            for (let y = -ROW_GAP; y <= height + ROW_GAP; y += ROW_GAP) rowYs.push(y)
            xs = []
            for (let x = -STEP; x <= width + STEP; x += STEP) xs.push(x)
        }

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2)
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            build()
        }
        resize()
        window.addEventListener('resize', resize)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // Desplazamiento vertical de la ola (suma de ondas viajeras → orgánico, no paralelo).
        const heightAt = (x, y, t) =>
            AMP * (0.55 * Math.sin(x * 0.010 + t * 0.7 + y * 0.012) +
                   0.30 * Math.sin(x * 0.023 - t * 0.5 + y * 0.008) +
                   0.15 * Math.sin(x * 0.041 + t * 0.9))

        let last = 0, elapsed = 0, frameId

        const draw = (now) => {
            frameId = requestAnimationFrame(draw)
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
            last = now
            if (!reducedMotion) elapsed += dt
            const t = elapsed

            const isDark = document.documentElement.classList.contains('dark')
            const baseA = isDark ? 0.14 : 0.11   // opacidad mínima de línea
            const crestA = isDark ? 0.30 : 0.24  // opacidad extra en la banda brillante

            ctx.clearRect(0, 0, width, height)
            ctx.lineWidth = 1
            ctx.lineJoin = 'round'

            for (let ri = 0; ri < rowYs.length; ri++) {
                const rowY = rowYs[ri]
                // Banda de brillo que viaja verticalmente → resalta algunas olas.
                const band = 0.5 + 0.5 * Math.sin(t * 0.6 - rowY * 0.018)
                const alpha = baseA + band * band * crestA

                ctx.strokeStyle = `rgba(${LIME.r},${LIME.g},${LIME.b},${alpha})`
                ctx.beginPath()
                for (let ci = 0; ci < xs.length; ci++) {
                    const x = xs[ci]
                    const y = rowY + heightAt(x, rowY, t)
                    if (ci === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                }
                ctx.stroke()
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
            {/* Olas de líneas finas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    )
}
