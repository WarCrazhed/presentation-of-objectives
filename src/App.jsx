import { useState, useEffect, lazy, Suspense } from 'react'
import { Home, Questions, Platforms, OperatingExpenses, StrategicObjective, AIUsage, PeriodActivity } from './pages'
import { Layout } from './components/Layout'

// Carga diferida: three.js pesa ~500 kB; la escena es decorativa y no bloquea el primer render.
const Scene3D = lazy(() => import('./components/Scene3D').then((m) => ({ default: m.Scene3D })))

export const App = () => {
    const [currentSlide, setCurrentSlide] = useState(() => Number(sessionStorage.getItem('h11_slide')) || 0)
    const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('h11_auth') === 'true')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        sessionStorage.setItem('h11_slide', String(currentSlide))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentSlide])

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === '2026_H11') {
            sessionStorage.setItem('h11_auth', 'true')
            setIsAuthenticated(true)
            setError(false)
        } else {
            setError(true)
            setPassword('')
        }
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const slides = [
        {
            content: "welcome",
            title: "Inicio",
            view: <Home />
        },
        {
            content: "platforms",
            title: "Uso de Plataformas",
            view: <Platforms />
        },
        {
            content: "period-activity",
            title: "Actividad del Periodo",
            view: <PeriodActivity />
        },
        {
            content: "strategy",
            title: "Objetivos Estratégicos",
            view: <StrategicObjective />
        },
        {
            content: "ai-usage",
            title: "Uso de IA",
            view: <AIUsage />
        },
        {
            content: "operating-expenses",
            title: "Gastos Operativos",
            view: <OperatingExpenses />
        },
        {
            content: "questions",
            title: "Preguntas",
            view: <Questions />
        }
    ]

    useEffect(() => {
        if (currentSlide > slides.length - 1) {
            setCurrentSlide(slides.length - 1)
        }
    }, [currentSlide, slides.length])

    if (!isAuthenticated) {
        return (
            <Layout>
                <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#f7f7f5] dark:bg-[#0a0a14]" />}>
                    <Scene3D currentSlide={0} totalSlides={slides.length} />
                </Suspense>
                <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-lime-500 to-lime-700 rounded-2xl mx-auto flex items-center justify-center text-4xl shadow-lg ring-4 ring-lime-500/20">
                                🚀
                            </div>
                            <h2 className="mt-6 text-center text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                                Acceso Restringido
                            </h2>
                            <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                Por favor ingrese la contraseña de la presentación
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        type="password"
                                        required
                                        className={`appearance-none rounded-2xl relative block w-full px-4 py-4 border ${error ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} placeholder-zinc-500 text-zinc-900 dark:text-white dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent sm:text-sm transition-all`}
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-xs font-bold text-center animate-pulse">
                                    Contraseña incorrecta. Intente de nuevo.
                                </p>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-gradient-to-r from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    INGRESAR ➜
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#f7f7f5] dark:bg-[#0a0a14]" />}>
                <Scene3D currentSlide={currentSlide} totalSlides={slides.length} />
            </Suspense>
            <div className="relative z-10">
                {slides[currentSlide].view}
            </div>
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200/70 dark:border-zinc-800/70">
                <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            aria-label="Anterior"
                            className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-lime-500 text-white shadow-md hover:bg-lime-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="truncate text-sm font-bold text-zinc-800 dark:text-zinc-100">{slides[currentSlide].title}</span>
                                <span className="shrink-0 text-xs font-semibold text-zinc-400 dark:text-zinc-500 tabular-nums">{currentSlide + 1} / {slides.length}</span>
                            </div>
                            <div className="mt-2 flex justify-center gap-1.5">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={`Ir al slide ${index + 1}`}
                                        className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-lime-500 w-8' : 'bg-zinc-300 dark:bg-zinc-700 w-1.5 hover:bg-lime-400 dark:hover:bg-lime-700'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            aria-label="Siguiente"
                            className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-lime-500 text-white shadow-md hover:bg-lime-600 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </footer>
        </Layout>
    )
}
