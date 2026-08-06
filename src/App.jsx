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
            view: <Home />
        },
        {
            content: "platforms",
            view: <Platforms />
        },
        {
            content: "period-activity",
            view: <PeriodActivity />
        },
        {
            content: "strategy",
            view: <StrategicObjective />
        },
        {
            content: "ai-usage",
            view: <AIUsage />
        },
        {
            content: "operating-expenses",
            view: <OperatingExpenses />
        },
        {
            content: "questions",
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
                <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#e8eef7] dark:bg-[#0a0a14]" />}>
                    <Scene3D currentSlide={0} totalSlides={slides.length} />
                </Suspense>
                <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <div className="w-20 h-20 bg-gradient-to-tr from-lime-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-4xl shadow-lg ring-4 ring-lime-500/20">
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
                                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-gradient-to-r from-lime-500 to-indigo-600 hover:from-lime-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
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
            <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#e8eef7] dark:bg-[#0a0a14]" />}>
                <Scene3D currentSlide={currentSlide} totalSlides={slides.length} />
            </Suspense>
            <div className="relative z-10">
                {slides[currentSlide].view}
            </div>
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-lime-600/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4">
                    <div className="flex items-center justify-between text-zinc-50">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="flex items-center space-x-0 md:space-x-2 px-3 py-2 md:px-4 md:py-2 text-sm font-bold bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900/50 disabled:text-zinc-600 rounded-xl transition-all active:scale-95"
                        >
                            <span className="text-lg md:text-sm">←</span>
                            <span className="hidden md:inline">Anterior</span>
                        </button>

                        <div className="flex space-x-2 sm:space-x-3">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-lime-500 w-6 sm:w-8' : 'bg-zinc-400 dark:bg-zinc-600 w-1.5 hover:bg-zinc-500'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className="flex items-center space-x-0 md:space-x-2 px-3 py-2 md:px-4 md:py-2 text-sm font-bold bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900/50 disabled:text-zinc-600 rounded-xl transition-all active:scale-95"
                        >
                            <span className="hidden md:inline">Siguiente</span>
                            <span className="text-lg md:text-sm">→</span>
                        </button>
                    </div>
                </div>
            </footer>
        </Layout>
    )
}
