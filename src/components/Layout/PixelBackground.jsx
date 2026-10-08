import { useEffect, useRef } from "react"

/*
 * Fondo de píxeles animados (técnica del hero de about.gitlab.com).
 * Un shader WebGL2 pinta una retícula fina de puntos: un campo de ondas que
 * deriva lento se convierte en puntos con dithering Bayer 8×8, así que se ven
 * nubes de píxeles que fluyen. Bajo el cursor aparece una nube circular verde
 * con estela. Los colores salen de las variables del tema (claro/oscuro).
 */
const CELL = 4           // tamaño de celda de la retícula (px CSS)
const DOT = 2            // lado del punto dentro de la celda
const RADIUS = 140       // radio del círculo del cursor
const INTENSITY = 0.35   // opacidad máxima de los puntos del fondo (baja para no competir con el texto)
const STEPS = 15         // el campo avanza a saltos, 15 por segundo (look pixelado)
const TRAIL = 16         // puntos de estela que recuerda el cursor

const VERTEX = `#version 300 es
void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uCell;
uniform float uDot;
uniform float uTime;
uniform float uIntensity;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uAccentSoft;
uniform vec3 uCursor;      // x, y, intensidad
uniform float uRadius;
uniform vec3 uTrail[${TRAIL}]; // x, y, vida
uniform int uTrailCount;

out vec4 outColor;

float bayer2(vec2 a) { a = floor(a); return fract(a.x * 0.5 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(a * 0.5) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(a * 0.5) * 0.25 + bayer2(a); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Ondas senoidales con el dominio deformado: da manchas orgánicas que derivan.
float field(vec2 ic) {
    vec2 g = ic / (uRes.y / uCell);
    float t = uTime;
    vec2 w = g + vec2(
        0.16 * sin(g.y * 4.7 + t * 0.55) + 0.08 * cos(g.y * 9.1 - t * 0.35),
        0.13 * cos(g.x * 3.9 - t * 0.45) + 0.07 * sin(g.x * 8.3 + t * 0.6)
    );
    float n = 0.5 + 0.5 * (
        0.5 * sin(w.x * 5.4 + w.y * 2.9 + t * 0.7) +
        0.3 * sin(w.x * 10.7 - w.y * 7.2 - t * 1.05 + 1.7) +
        0.2 * sin(w.x * 19.3 + w.y * 15.8 + t * 1.6 + 0.9)
    );
    return (n - 0.45 + (hash(ic) - 0.5) * 0.16) * 1.75;
}

bool inDot(vec2 inCell, float size) {
    float off = (uCell - size) * 0.5;
    return all(greaterThanEqual(inCell, vec2(off))) && all(lessThan(inCell, vec2(off + size)));
}

void main() {
    vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
    vec2 ic = floor(frag / uCell);
    vec2 inCell = frag - ic * uCell;
    vec2 center = ic * uCell + uCell * 0.5;
    float threshold = bayer8(ic) + 1.0 / 128.0;
    vec4 col = vec4(0.0);

    float v = field(ic);
    if (v > threshold && inDot(inCell, uDot)) {
        float level = v < 0.3 ? 0.34 : (v < 0.62 ? 0.66 : 1.0);
        col = vec4(uInk, uIntensity * level);
    }

    float amp = uCursor.z;
    if (amp > 0.01) {
        // estela: nubecitas que se encogen y apagan detrás del cursor
        for (int i = 0; i < ${TRAIL}; i++) {
            if (i >= uTrailCount) break;
            vec3 m = uTrail[i];
            float life = m.z * m.z * amp;
            if (life < 0.04) continue;
            vec2 d = (center - m.xy) / (uRadius * 0.45 * (0.5 + 0.5 * m.z));
            float r2 = dot(d, d);
            if (r2 > 4.0) continue;
            float s = exp(-r2 / 0.49) * life;
            float h = hash(ic + vec2(float(i) * 37.0, 3.0));
            if (s > 0.02 && s > threshold * 1.25 + (h - 0.5) * 0.4 && inDot(inCell, uDot)) {
                col = vec4(mix(uAccentSoft, uAccent, h), 0.5 * amp);
            }
        }

        // círculo bajo el cursor, con borde ondulante y dithering
        vec2 p = (center - uCursor.xy) / uRadius;
        float wobble = 0.86 + 0.24 * sin(p.x * 6.5 + p.y * 5.2 + uTime * 1.4) * cos(p.y * 4.1 - uTime * 0.8);
        float f = exp(-dot(p, p) / 0.45) * wobble;
        float m = clamp((f - 0.25) * 1.8, 0.0, 1.0) * amp;
        float h = hash(ic + vec2(13.0, 29.0));
        if (m > 0.02 && m > threshold * 1.1 + (h - 0.5) * 0.3) {
            float size = uDot + (uCell - uDot) * 0.4 * clamp((m - 0.5) / 0.5, 0.0, 1.0);
            if (inDot(inCell, size)) {
                float tone = clamp(m + (h - 0.5) * 0.5, 0.0, 1.0);
                col = vec4(mix(uAccentSoft, uAccent, tone), 0.95 * amp);
            }
        }
    }

    outColor = vec4(col.rgb * col.a, col.a);
}`

const hexToRgb = (value, fallback) => {
    const hex = value.trim().replace("#", "")
    if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
}

const compile = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
    console.error("[PixelBackground]", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
}

export const PixelBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, depth: false, stencil: false })
        if (!gl) return

        const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
        if (!vs || !fs) return
        const program = gl.createProgram()
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("[PixelBackground]", gl.getProgramInfoLog(program))
            return
        }
        gl.useProgram(program)
        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)

        const u = (name) => gl.getUniformLocation(program, name)
        const uniforms = {
            res: u("uRes"), cell: u("uCell"), dot: u("uDot"), time: u("uTime"),
            intensity: u("uIntensity"), ink: u("uInk"), accent: u("uAccent"),
            accentSoft: u("uAccentSoft"), cursor: u("uCursor"), radius: u("uRadius"),
            trail: u("uTrail"), trailCount: u("uTrailCount"),
        }
        gl.uniform1f(uniforms.intensity, INTENSITY)

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const trailData = new Float32Array(TRAIL * 3)
        let dpr = 1
        let frame = 0
        let last = 0

        // cursor real (tx, ty) y el suavizado que se dibuja (x, y)
        const pointer = { x: 0, y: 0, tx: 0, ty: 0, amp: 0, inside: false, trail: [] }

        const readColors = () => {
            const styles = getComputedStyle(document.documentElement)
            const read = (name, fallback) => hexToRgb(styles.getPropertyValue(name), fallback)
            gl.uniform3f(uniforms.ink, ...read("--color-faint", [0.6, 0.64, 0.62]))
            gl.uniform3f(uniforms.accent, ...read("--color-accent", [0.64, 0.9, 0.21]))
            gl.uniform3f(uniforms.accentSoft, ...read("--color-accent-soft", [0.29, 0.37, 0.16]))
        }

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.round(window.innerWidth * dpr)
            canvas.height = Math.round(window.innerHeight * dpr)
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.uniform2f(uniforms.res, canvas.width, canvas.height)
            gl.uniform1f(uniforms.cell, CELL * dpr)
            gl.uniform1f(uniforms.dot, DOT * dpr)
            gl.uniform1f(uniforms.radius, RADIUS * dpr)
        }

        const updatePointer = (dt) => {
            const ease = (rate) => 1 - Math.exp(-rate * dt)
            const prevX = pointer.x
            const prevY = pointer.y
            pointer.x += (pointer.tx - pointer.x) * ease(9)
            pointer.y += (pointer.ty - pointer.y) * ease(9)
            const target = pointer.inside ? 1 : 0
            pointer.amp += (target - pointer.amp) * ease(target > pointer.amp ? 4 : 1.5)

            // deja un punto de estela cada ~10 px de recorrido
            const moved = Math.hypot(pointer.x - prevX, pointer.y - prevY)
            const tail = pointer.trail[pointer.trail.length - 1]
            if (pointer.amp > 0.05 && moved > 1 && (!tail || Math.hypot(pointer.x - tail.x, pointer.y - tail.y) > 10)) {
                pointer.trail.push({ x: pointer.x, y: pointer.y, life: 1 })
                if (pointer.trail.length > TRAIL) pointer.trail.shift()
            }
            pointer.trail.forEach((point) => { point.life -= 0.6 * dt })
            pointer.trail = pointer.trail.filter((point) => point.life > 0)
        }

        const render = (now) => {
            frame = requestAnimationFrame(render)
            const dt = Math.min(0.05, last ? (now - last) / 1000 : 0)
            last = now
            updatePointer(dt)

            const time = reduceMotion ? 0 : Math.round((now / 1000) * STEPS) / STEPS
            gl.uniform1f(uniforms.time, time)
            gl.uniform3f(uniforms.cursor, pointer.x * dpr, pointer.y * dpr, pointer.amp)
            pointer.trail.forEach((point, i) => {
                trailData[i * 3] = point.x * dpr
                trailData[i * 3 + 1] = point.y * dpr
                trailData[i * 3 + 2] = point.life
            })
            gl.uniform3fv(uniforms.trail, trailData)
            gl.uniform1i(uniforms.trailCount, pointer.trail.length)

            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        const onMove = (e) => {
            if (!pointer.inside && pointer.amp < 0.01) {
                // primera entrada: el círculo nace donde está el cursor
                pointer.x = e.clientX
                pointer.y = e.clientY
            }
            pointer.tx = e.clientX
            pointer.ty = e.clientY
            pointer.inside = true
        }
        const onLeave = () => {
            pointer.inside = false
        }

        // el tema cambia la clase de <html>; releer colores cuando pase
        const themeObserver = new MutationObserver(readColors)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

        readColors()
        resize()
        frame = requestAnimationFrame(render)

        window.addEventListener("resize", resize)
        window.addEventListener("pointermove", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        window.addEventListener("blur", onLeave)

        return () => {
            cancelAnimationFrame(frame)
            themeObserver.disconnect()
            window.removeEventListener("resize", resize)
            window.removeEventListener("pointermove", onMove)
            document.documentElement.removeEventListener("pointerleave", onLeave)
            window.removeEventListener("blur", onLeave)
            gl.deleteVertexArray(vao)
            gl.deleteProgram(program)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 size-full"
        />
    )
}
