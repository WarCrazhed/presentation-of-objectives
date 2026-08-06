import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Fondo: aurora sutil (CSS) + constelación de nodos 3D conectados (Three.js) encima.
// Metáfora del ecosistema Humana11: plataformas conectadas. Discreto para presentación ejecutiva.
// Firma { currentSlide, totalSlides } intacta para no tocar App.jsx.

// Paleta por sección, alineada con los gradientes de título de cada slide.
const PALETTE = ['#84cc16', '#6366f1', '#a855f7', '#84cc16', '#f97316', '#06b6d4', '#818cf8', '#84cc16']

// Manchas de aurora (capa base, CSS puro).
const BLOBS = [
    { anim: 'aurora-1', dur: '20s', pos: 'top-[-15%] left-[-10%]', size: 'w-[55vw] h-[55vw]', offset: 0 },
    { anim: 'aurora-2', dur: '26s', pos: 'top-[5%] right-[-12%]', size: 'w-[48vw] h-[48vw]', offset: 2 },
    { anim: 'aurora-3', dur: '32s', pos: 'bottom-[-20%] left-[20%]', size: 'w-[52vw] h-[52vw]', offset: 4 },
    { anim: 'aurora-2', dur: '38s', pos: 'bottom-[10%] right-[15%]', size: 'w-[34vw] h-[34vw]', offset: 6 },
]

const NODE_COUNT = 16
const LINK_DISTANCE = 5.5 // umbral para conectar dos nodos con una línea

export const Scene3D = ({ currentSlide = 0 }) => {
    const mountRef = useRef(null)
    const slideRef = useRef(currentSlide)

    // Mantener el slide accesible desde el loop sin recrear la escena.
    useEffect(() => {
        slideRef.current = currentSlide
    }, [currentSlide])

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200)
        camera.position.set(0, 0, 15)

        // alpha:true → canvas transparente para dejar ver la aurora de abajo.
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        const group = new THREE.Group()
        scene.add(group)

        // ---- Nodos: posiciones en volumen acotado (encajan en pantalla) ----
        const bounds = { x: 9, y: 5, z: 3.5 }
        const seeds = [0.12, 0.83, 0.41, 0.66, 0.28, 0.95, 0.53, 0.07, 0.74, 0.36, 0.61, 0.19, 0.88, 0.47, 0.71, 0.03]
        const rand = (i, salt) => {
            const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
            return v - Math.floor(v)
        }

        const positions = []
        for (let i = 0; i < NODE_COUNT; i++) {
            positions.push(new THREE.Vector3(
                (rand(i, 1) - 0.5) * 2 * bounds.x,
                (rand(i, 2) - 0.5) * 2 * bounds.y,
                (rand(i, 3) - 0.5) * 2 * bounds.z
            ))
        }

        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x84cc16,
            emissive: 0x84cc16,
            emissiveIntensity: 0.5,
            flatShading: true,
        })
        const nodeGeometry = new THREE.IcosahedronGeometry(0.16, 0)
        const nodes = []
        positions.forEach((p, i) => {
            const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial)
            mesh.position.copy(p)
            const scale = 0.7 + seeds[i] * 0.9 // variar tamaño para dar profundidad
            mesh.scale.setScalar(scale)
            mesh.userData.phase = seeds[i] * Math.PI * 2
            group.add(mesh)
            nodes.push(mesh)
        })

        // ---- Líneas: conectar nodos cercanos ----
        const linePoints = []
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (positions[i].distanceTo(positions[j]) < LINK_DISTANCE) {
                    linePoints.push(positions[i].x, positions[i].y, positions[i].z)
                    linePoints.push(positions[j].x, positions[j].y, positions[j].z)
                }
            }
        }
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3))
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x84cc16, transparent: true, opacity: 0.22 })
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
        group.add(lines)

        // ---- Luces ----
        const ambient = new THREE.AmbientLight(0xffffff, 0.9)
        scene.add(ambient)
        const directional = new THREE.DirectionalLight(0xffffff, 1.1)
        directional.position.set(4, 6, 8)
        scene.add(directional)

        // ---- Tema claro/oscuro: ajusta opacidad de líneas y luz ambiente ----
        const applyTheme = () => {
            const isDark = document.documentElement.classList.contains('dark')
            lineMaterial.opacity = isDark ? 0.28 : 0.18
            ambient.intensity = isDark ? 0.7 : 1.1
            nodeMaterial.emissiveIntensity = isDark ? 0.6 : 0.4
        }
        applyTheme()
        const themeObserver = new MutationObserver(applyTheme)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        // ---- Parallax por puntero ----
        const pointer = { x: 0, y: 0 }
        const onPointerMove = (e) => {
            pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
            pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('pointermove', onPointerMove)

        // ---- Animación ----
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const clock = new THREE.Clock()
        const accent = new THREE.Color(0x84cc16)
        let frameId

        const animate = () => {
            frameId = requestAnimationFrame(animate)
            const dt = Math.min(clock.getDelta(), 0.05)
            const t = clock.elapsedTime

            // Color objetivo según el slide; interpola suave.
            accent.set(PALETTE[slideRef.current % PALETTE.length])
            nodeMaterial.color.lerp(accent, dt * 1.5)
            nodeMaterial.emissive.lerp(accent, dt * 1.5)
            lineMaterial.color.lerp(accent, dt * 1.5)

            if (!reducedMotion) {
                group.rotation.y += dt * 0.05
                group.rotation.x = Math.sin(t * 0.15) * 0.08
                nodes.forEach((n) => {
                    n.rotation.x += dt * 0.3
                    n.rotation.y += dt * 0.4
                })
            }

            // Parallax de cámara suave.
            camera.position.x += (pointer.x * 1.5 - camera.position.x) * dt * 1.5
            camera.position.y += (-pointer.y * 1.0 - camera.position.y) * dt * 1.5
            camera.lookAt(0, 0, 0)

            renderer.render(scene, camera)
        }
        animate()

        // Pausa cuando la pestaña no es visible.
        const onVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(frameId)
            } else {
                clock.getDelta()
                animate()
            }
        }
        document.addEventListener('visibilitychange', onVisibility)

        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(frameId)
            document.removeEventListener('visibilitychange', onVisibility)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('pointermove', onPointerMove)
            themeObserver.disconnect()
            nodeGeometry.dispose()
            nodeMaterial.dispose()
            lineGeometry.dispose()
            lineMaterial.dispose()
            renderer.dispose()
            mount.removeChild(renderer.domElement)
        }
    }, [])

    const colorAt = (offset) => PALETTE[(currentSlide + offset) % PALETTE.length]

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#e8eef7] dark:bg-[#0a0a14]"
            aria-hidden="true"
        >
            {/* Capa 1: aurora (manchas difuminadas) */}
            {BLOBS.map((b, i) => (
                <div
                    key={i}
                    className={`aurora-blob absolute ${b.pos} ${b.size} rounded-full blur-[110px] opacity-40 dark:opacity-50 transition-colors duration-1000 ease-in-out`}
                    style={{ backgroundColor: colorAt(b.offset), '--aurora-anim': b.anim, '--aurora-dur': b.dur }}
                />
            ))}
            {/* Capa 2: velo para bajar contraste de la aurora */}
            <div className="absolute inset-0 bg-[#e8eef7]/40 dark:bg-[#0a0a14]/50" />
            {/* Capa 3: constelación de nodos 3D (blur leve → profundidad de campo) */}
            <div ref={mountRef} className="absolute inset-0 blur-[3px]" />
        </div>
    )
}
