import { useState, useEffect } from 'react'
import { Home, Questions, Platforms, OperatingExpenses, StrategicObjective, AIUsage, PeriodActivity } from './pages'
import { Layout } from './components/Layout'
import { Alert, ArrowRight, ChevronLeft, ChevronRight, Eye, Lock } from './components/icons'

const pad = (n) => String(n).padStart(2, '0')

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
                <div className="flex min-h-[calc(100vh-13rem)] items-center justify-center px-4 py-16">
                    <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-line bg-panel p-8">
                        <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-panel-2 text-accent">
                            <Lock className="size-5" />
                        </span>

                        <div className="flex flex-col gap-1.5">
                            <h1 className="text-xl font-semibold tracking-tight">Acceso restringido</h1>
                            <p className="text-sm text-muted">Ingresa la contraseña de la presentación para continuar.</p>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="h11-password" className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        id="h11-password"
                                        type="password"
                                        required
                                        autoFocus
                                        className={`w-full rounded-lg border bg-canvas px-3.5 py-3 pr-10 text-sm tracking-widest text-ink placeholder-dim focus:outline-none ${error ? 'border-danger' : 'border-line focus:border-accent'}`}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Eye className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-dim" />
                                </div>
                            </div>

                            {error && (
                                <p className="flex items-center gap-2 rounded-lg bg-danger-bg px-3 py-2.5 text-xs text-danger">
                                    <Alert className="size-4 shrink-0" />
                                    Contraseña incorrecta. Intenta de nuevo.
                                </p>
                            )}

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                            >
                                Entrar
                                <ArrowRight className="size-4" />
                            </button>
                        </form>

                        <p className="text-center font-mono text-[10px] text-faint">
                            humana11 · funcionalidad tecnológica · 2026
                        </p>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout counter={`${pad(currentSlide + 1)} / ${pad(slides.length)}`}>
            {slides[currentSlide].view}

            <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-panel">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-7">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        aria-label="Slide anterior"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:text-faint"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                        <div className="flex w-full items-center gap-1">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.content}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`Ir a ${slide.title}`}
                                    aria-current={index === currentSlide}
                                    title={slide.title}
                                    className={`h-1 flex-1 rounded-sm transition-colors ${index === currentSlide ? 'bg-accent' : 'bg-line hover:bg-accent-soft'}`}
                                />
                            ))}
                        </div>
                        <p className="truncate text-xs text-muted">{slides[currentSlide].title}</p>
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        aria-label="Slide siguiente"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-ink transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:bg-line disabled:text-faint"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </footer>
        </Layout>
    )
}
