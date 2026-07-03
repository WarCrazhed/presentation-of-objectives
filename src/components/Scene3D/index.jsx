import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Paleta de estaciones: una por slide, alineada con el gradiente de título de cada sección.
const STATION_COLORS = ['#84cc16', '#6366f1', '#a855f7', '#84cc16', '#f97316', '#06b6d4', '#818cf8', '#84cc16']

const THEMES = {
    dark: {
        background: 0x0a0a14,
        fog: 0x0a0a14,
        stars: 0xffffff,
        path: 0x3f3f46,
        ambient: 0.5,
    },
    light: {
        background: 0xe8eef7,
        fog: 0xe8eef7,
        stars: 0x94a3b8,
        path: 0xa1a1aa,
        ambient: 1.1,
    },
}

export const Scene3D = ({ currentSlide, totalSlides }) => {
    const mountRef = useRef(null)
    const slideRef = useRef(currentSlide)

    // Mantener el slide actual accesible desde el loop de animación sin recrear la escena.
    useEffect(() => {
        slideRef.current = currentSlide
    }, [currentSlide])

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200)
        camera.position.set(0, 2.5, 14)

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        mount.appendChild(renderer.domElement)

        // ---- Ruta: curva suave que atraviesa la escena, una estación por slide ----
        const span = Math.max(totalSlides - 1, 1)
        const SPACING = 7
        const pathPoints = []
        for (let i = 0; i < totalSlides; i++) {
            pathPoints.push(new THREE.Vector3(
                (i - span / 2) * SPACING,
                Math.sin(i * 1.1) * 1.4,
                Math.cos(i * 0.9) * 2 - 2
            ))
        }
        const curve = new THREE.CatmullRomCurve3(pathPoints)

        const pathGeometry = new THREE.TubeGeometry(curve, 64, 0.03, 6, false)
        const pathMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5 })
        const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial)
        scene.add(pathMesh)

        // ---- Estaciones: esferas con anillo; la activa se ilumina y crece ----
        const stations = []
        pathPoints.forEach((point, i) => {
            const color = new THREE.Color(STATION_COLORS[i % STATION_COLORS.length])
            const group = new THREE.Group()

            const sphere = new THREE.Mesh(
                new THREE.IcosahedronGeometry(0.55, 1),
                new THREE.MeshStandardMaterial({ color, flatShading: true, emissive: color, emissiveIntensity: 0.15 })
            )
            group.add(sphere)

            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.95, 0.035, 8, 40),
                new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })
            )
            ring.rotation.x = Math.PI / 2.4
            group.add(ring)

            group.position.copy(point)
            scene.add(group)
            stations.push({ group, sphere, ring, baseColor: color })
        })

        // ---- Cohete low-poly: cuerpo + nariz + aletas + llama ----
        const rocket = new THREE.Group()

        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.3, 1.1, 8),
            new THREE.MeshStandardMaterial({ color: 0xe4e4e7, flatShading: true })
        )
        rocket.add(body)

        const nose = new THREE.Mesh(
            new THREE.ConeGeometry(0.22, 0.5, 8),
            new THREE.MeshStandardMaterial({ color: 0x84cc16, flatShading: true })
        )
        nose.position.y = 0.8
        rocket.add(nose)

        const finMaterial = new THREE.MeshStandardMaterial({ color: 0x6366f1, flatShading: true })
        for (let i = 0; i < 3; i++) {
            const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.3), finMaterial)
            const angle = (i / 3) * Math.PI * 2
            fin.position.set(Math.cos(angle) * 0.28, -0.5, Math.sin(angle) * 0.28)
            fin.rotation.y = -angle
            rocket.add(fin)
        }

        const flame = new THREE.Mesh(
            new THREE.ConeGeometry(0.16, 0.55, 8),
            new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 })
        )
        flame.position.y = -0.85
        flame.rotation.x = Math.PI
        rocket.add(flame)

        const rocketLight = new THREE.PointLight(0xfbbf24, 6, 6)
        rocketLight.position.y = -1
        rocket.add(rocketLight)

        rocket.scale.setScalar(0.9)
        scene.add(rocket)

        // ---- Estrellas ----
        const starCount = 700
        const starPositions = new Float32Array(starCount * 3)
        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 120
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 70
            starPositions[i * 3 + 2] = -10 - Math.random() * 60
        }
        const starGeometry = new THREE.BufferGeometry()
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        const starMaterial = new THREE.PointsMaterial({ size: 0.14, transparent: true, opacity: 0.8 })
        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // ---- Luces ----
        const ambient = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambient)
        const directional = new THREE.DirectionalLight(0xffffff, 1.4)
        directional.position.set(5, 8, 6)
        scene.add(directional)

        // ---- Tema claro/oscuro: sincroniza con la clase `dark` en <html> ----
        const applyTheme = () => {
            const theme = document.documentElement.classList.contains('dark') ? THEMES.dark : THEMES.light
            scene.background = new THREE.Color(theme.background)
            scene.fog = new THREE.Fog(theme.fog, 18, 60)
            starMaterial.color.set(theme.stars)
            pathMaterial.color.set(theme.path)
            ambient.intensity = theme.ambient
        }
        applyTheme()
        const themeObserver = new MutationObserver(applyTheme)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        // ---- Animación ----
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const clock = new THREE.Clock()
        let progress = slideRef.current / span
        let frameId

        const tangent = new THREE.Vector3()
        const up = new THREE.Vector3(0, 1, 0)
        const lookTarget = new THREE.Vector3()

        const animate = () => {
            frameId = requestAnimationFrame(animate)
            const dt = Math.min(clock.getDelta(), 0.05)
            const elapsed = clock.elapsedTime

            // Avanza suavemente hacia la estación del slide actual.
            const target = slideRef.current / span
            progress += reducedMotion
                ? (target - progress)
                : (target - progress) * Math.min(1, dt * 2.2)

            const clamped = THREE.MathUtils.clamp(progress, 0, 1)
            curve.getPointAt(clamped, rocket.position)
            rocket.position.y += Math.sin(elapsed * 1.8) * 0.15 + 1.4 // flota sobre la ruta

            // Orientación: nariz apunta hacia la dirección de viaje; en reposo, hacia arriba.
            curve.getTangentAt(clamped, tangent)
            const moving = Math.abs(target - progress) > 0.002
            const dir = moving && target < progress ? -1 : 1
            lookTarget.copy(rocket.position).addScaledVector(tangent, dir * 2)
            if (moving) {
                rocket.up.copy(up)
                rocket.lookAt(lookTarget)
                rocket.rotateX(Math.PI / 2) // el cono apunta +Y; alinear con la tangente
            } else {
                rocket.rotation.x = THREE.MathUtils.lerp(rocket.rotation.x, 0, dt * 3)
                rocket.rotation.z = THREE.MathUtils.lerp(rocket.rotation.z, Math.sin(elapsed * 0.8) * 0.08, dt * 3)
            }

            // Llama parpadea; más intensa en movimiento.
            const flicker = 0.8 + Math.sin(elapsed * 22) * 0.2
            flame.scale.set(flicker, moving ? 1.5 : flicker, flicker)
            rocketLight.intensity = moving ? 10 : 5

            // Estaciones: la activa pulsa y gira.
            stations.forEach((station, i) => {
                const isActive = i === slideRef.current
                const targetScale = isActive ? 1.35 : 1
                station.group.scale.setScalar(THREE.MathUtils.lerp(station.group.scale.x, targetScale, dt * 4))
                station.sphere.rotation.y += dt * (isActive ? 0.8 : 0.2)
                station.ring.rotation.z += dt * (isActive ? 1.2 : 0.3)
                station.sphere.material.emissiveIntensity = THREE.MathUtils.lerp(
                    station.sphere.material.emissiveIntensity,
                    isActive ? 0.7 : 0.15,
                    dt * 4
                )
            })

            stars.rotation.y = elapsed * 0.004

            // Cámara sigue al cohete con parallax suave.
            camera.position.x = THREE.MathUtils.lerp(camera.position.x, rocket.position.x * 0.8, dt * 2)
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, rocket.position.y * 0.3 + 2, dt * 2)
            camera.lookAt(rocket.position.x, rocket.position.y * 0.5 + 0.5, 0)

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
            themeObserver.disconnect()
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose()
                if (obj.material) {
                    (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => m.dispose())
                }
            })
            renderer.dispose()
            mount.removeChild(renderer.domElement)
        }
    }, [totalSlides])

    return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
}
