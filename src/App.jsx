import { useState } from 'react'
import { Home, Questions, Platforms, OperatingExpenses, StrategicObjective, EmergingProject } from './pages'
import { Layout } from './components/Layout'

export const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === '2026_H11') {
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
            content: "strategy",
            view: <StrategicObjective />
        },
        {
            content: "emerging",
            view: <EmergingProject />
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

    if (!isAuthenticated) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-radial-[at_50%_75%] from-sky-100 via-zinc-100 to-slate-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
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
            {slides[currentSlide].view}
            <footer className="fixed bottom-0 left-0 right-0 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-lime-600">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between text-zinc-50">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="flex items-center space-x-2 px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 rounded-lg transition-colors"
                        >
                            <span>←</span>
                            <span>Anterior</span>
                        </button>

                        <div className="flex space-x-3">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-lime-400 w-8' : 'bg-zinc-600 hover:bg-zinc-500'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className="flex items-center space-x-2 px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 rounded-lg transition-colors"
                        >
                            <span>Siguiente</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </footer>
        </Layout>
    )
}

/*     const slides = [
        {
            title: "Objetivos Tecnológicos",
            subtitle: "Funcionalidad Tecnológica • Humana11",
            content: "objectives"
        },
        {
            title: "Resultados & Acciones",
            subtitle: "Avances • Logros • Soluciones",
            content: "results"
        }
    ]

    const platforms = [
        {
            name: "Página Web",
            status: "Completada",
            description: "Plataforma corporativa en mantenimiento continuo",
            progress: 100,
            color: "sky",
            accent: "bg-sky-400",
            timeline: "Todo el año 2025",
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            name: "SuiteDO",
            status: "Desarrollo",
            description: "Desarrollo Organizacional • Meta: Diciembre 2025",
            features: ["Diagnósticos 360", "Clima laboral", "DNS", "NOM035 (pendiente)", "Sistema de mentores", "Formación educativa"],
            progress: 65,
            color: "lime",
            accent: "bg-lime-400",
            timeline: "Hasta Diciembre 2025",
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            name: "UHE",
            status: "Desarrollo",
            description: "Formación empresarial • Meta: Septiembre 2025",
            features: ["Bachillerato", "Licenciatura", "Programas personalizados"],
            progress: 45,
            color: "indigo",
            accent: "bg-indigo-400",
            timeline: "Hasta Septiembre 2025",
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
            name: "Talento",
            status: "Testing",
            description: "Seguimiento de vacantes • 3 roles integrados",
            features: ["Caza talento", "Cliente", "Candidato"],
            progress: 90,
            color: "slate",
            accent: "bg-slate-400",
            timeline: "Hasta Agosto 2025",
            months: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    ]

    const months = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-800 text-white font-mono">

            <header className="border-b-2 border-zinc-700 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-xl font-light tracking-wide">José Mario Zamora</h1>
                            <p className="text-zinc-400 text-sm">Gerente de Funcionalidad Tecnológica</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-xs text-zinc-500 uppercase tracking-wider">Slide</p>
                                <p className="text-lime-400 font-medium">{currentSlide + 1}/{slides.length}</p>
                            </div>
                            <div className="w-px h-8 bg-zinc-700"></div>
                            <div className="text-lime-400 text-sm">HUMANA11</div>
                        </div>
                    </div>
                </div>
            </header>


            <main className="max-w-7xl mx-auto px-8 py-12 pb-32">

                <div className="mb-16 text-center space-y-4">
                    <h2 className="text-5xl font-extralight tracking-tight">{slides[currentSlide].title}</h2>
                    <div className="w-24 h-px bg-lime-400 mx-auto"></div>
                    <p className="text-zinc-400 text-lg font-light">{slides[currentSlide].subtitle}</p>
                </div>


                {currentSlide === 0 && (
                    <div className="space-y-12">
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {platforms.map((platform, index) => (
                                <div key={index} className="group">
                                    <div className="bg-zinc-900/50 border-2 border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all duration-300">
                                        
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-3 h-3 rounded-full ${platform.accent}`}></div>
                                                <h3 className="text-2xl font-light">{platform.name}</h3>
                                            </div>
                                            <span className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border ${platform.status === 'Completada' ? 'text-lime-400 border-lime-400/30 bg-lime-400/10' :
                                                platform.status === 'Testing' ? 'text-slate-400 border-slate-400/30 bg-slate-400/10' :
                                                    'text-zinc-400 border-zinc-400/30 bg-zinc-400/10'
                                                }`}>
                                                {platform.status}
                                            </span>
                                        </div>

                                        
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-zinc-400">Progreso</span>
                                                <span className="text-lime-400">{platform.progress}%</span>
                                            </div>
                                            <div className="w-full bg-zinc-800 rounded-full h-1">
                                                <div
                                                    className="bg-lime-400 h-1 rounded-full transition-all duration-1000"
                                                    style={{ width: `${platform.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        
                                        <p className="text-zinc-300 mb-6 leading-relaxed">{platform.description}</p>

                                        
                                        {platform.features && (
                                            <div className="space-y-2 mb-6">
                                                {platform.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center text-sm">
                                                        <div className="w-1 h-1 bg-zinc-500 rounded-full mr-3"></div>
                                                        <span className={feature.includes('pendiente') ? 'text-zinc-500' : 'text-zinc-400'}>
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        
                                        <div className="mt-6 pt-6 border-t border-zinc-700">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs text-zinc-500 uppercase tracking-wider">Timeline 2025</span>
                                                <span className="text-xs text-zinc-400">{platform.timeline}</span>
                                            </div>
                                            <div className="grid grid-cols-12 gap-1">
                                                {months.map((month, idx) => (
                                                    <div key={idx} className="text-center">
                                                        <div className="text-xs text-zinc-500 mb-1">{month}</div>
                                                        <div className={`h-2 rounded-sm ${platform.months.includes(idx + 1)
                                                                ? platform.color === 'sky' ? 'bg-sky-400' :
                                                                    platform.color === 'lime' ? 'bg-lime-400' :
                                                                        platform.color === 'indigo' ? 'bg-indigo-400' :
                                                                            'bg-slate-400'
                                                                : 'bg-zinc-800'
                                                            }`}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        
                        <div className="bg-zinc-900/30 border-2 border-zinc-700/50 rounded-2xl p-8">
                            <h3 className="text-2xl font-light mb-8 text-center">Objetivos Estratégicos</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-lime-400/10 border-2 border-lime-400/40 rounded-2xl mx-auto flex items-center justify-center">
                                        <div className="w-6 h-6 bg-lime-400 rounded-full"></div>
                                    </div>
                                    <h4 className="text-lime-400 font-medium">Monetización</h4>
                                    <p className="text-zinc-400 text-sm">SuiteDO operativa diciembre 2025</p>
                                </div>
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-indigo-400/10 border-2 border-indigo-400/40 rounded-2xl mx-auto flex items-center justify-center">
                                        <div className="w-6 h-6 bg-indigo-400 rounded-full"></div>
                                    </div>
                                    <h4 className="text-indigo-400 font-medium">Expansión</h4>
                                    <p className="text-zinc-400 text-sm">UHE operativa septiembre 2025</p>
                                </div>
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-slate-400/10 border-2 border-slate-400/40 rounded-2xl mx-auto flex items-center justify-center">
                                        <div className="w-6 h-6 bg-slate-400 rounded-full"></div>
                                    </div>
                                    <h4 className="text-slate-400 font-medium">Optimización</h4>
                                    <p className="text-zinc-400 text-sm">Talento en producción</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-zinc-900/30 border-2 border-zinc-700/50 rounded-2xl p-8">
                            <h3 className="text-2xl font-light mb-8 text-center">Calendario de Objetivos 2025</h3>
                            <div className="space-y-6">
                                {platforms.map((platform, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${platform.accent}`}></div>
                                                <span className="font-medium">{platform.name}</span>
                                            </div>
                                            <span className="text-sm text-zinc-400">{platform.timeline}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2">
                                            {months.map((month, idx) => (
                                                <div key={idx} className="text-center">
                                                    <div className="text-xs text-zinc-500 mb-2">{month}</div>
                                                    <div className={`h-3 rounded-sm transition-all duration-300 ${platform.months.includes(idx + 1)
                                                            ? platform.color === 'sky' ? 'bg-sky-400 shadow-sm shadow-sky-400/50' :
                                                                platform.color === 'lime' ? 'bg-lime-400 shadow-sm shadow-lime-400/50' :
                                                                    platform.color === 'indigo' ? 'bg-indigo-400 shadow-sm shadow-indigo-400/50' :
                                                                        'bg-slate-400 shadow-sm shadow-slate-400/50'
                                                            : 'bg-zinc-800'
                                                        }`}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                
                {currentSlide === 1 && (
                    <div className="space-y-12">
                        <div className="grid lg:grid-cols-2 gap-12">
                            
                            <div className="space-y-6">
                                <h3 className="text-2xl font-light text-lime-400 mb-8">Logros Alcanzados</h3>
                                <div className="space-y-4">
                                    {[
                                        { text: "Página Web completada y operativa", status: "complete" },
                                        { text: "Talento en fase final de testing", status: "complete" },
                                        { text: "SuiteDO: 3 diagnósticos implementados", status: "progress" },
                                        { text: "UHE: Arquitectura base establecida", status: "progress" }
                                    ].map((achievement, idx) => (
                                        <div key={idx} className="flex items-center space-x-4 p-4 bg-zinc-900/30 rounded-xl border-2 border-zinc-700/40">
                                            <div className={`w-2 h-2 rounded-full ${achievement.status === 'complete' ? 'bg-lime-400' : 'bg-indigo-400'
                                                }`}></div>
                                            <span className="text-zinc-300">{achievement.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            
                            <div className="space-y-6">
                                <h3 className="text-2xl font-light text-zinc-400 mb-8">Desafíos & Acciones</h3>
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "SuiteDO - Funcionalidades Críticas",
                                            challenge: "NOM035, mentores, chat pendientes",
                                            action: "Sprint intensivo Q4 2025",
                                            color: "lime"
                                        },
                                        {
                                            title: "UHE - Aceleración Requerida",
                                            challenge: "Timeline septiembre ajustado",
                                            action: "Recursos adicionales asignados",
                                            color: "indigo"
                                        },
                                        {
                                            title: "Talento - Refinamiento UX",
                                            challenge: "Optimizaciones menores",
                                            action: "Testing con usuarios reales",
                                            color: "slate"
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-zinc-900/30 border-2 border-zinc-700/40 rounded-xl p-6">
                                            <h4 className={`font-medium mb-2 text-${item.color}-400`}>{item.title}</h4>
                                            <p className="text-zinc-400 text-sm mb-3">{item.challenge}</p>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-1 h-1 bg-lime-400 rounded-full"></div>
                                                <span className="text-lime-400 text-xs uppercase tracking-wider">Acción:</span>
                                                <span className="text-zinc-300 text-sm">{item.action}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        
                        <div className="bg-zinc-900/30 border-2 border-zinc-700/50 rounded-2xl p-8">
                            <h3 className="text-2xl font-light mb-8 text-center">Roadmap 2025</h3>
                            <div className="relative max-w-4xl mx-auto">
                                <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-700"></div>
                                <div className="space-y-8 ml-16">
                                    {[
                                        { period: "Q1-Q2 2025", status: "Completado", desc: "Página Web y Talento finalizadas", color: "lime" },
                                        { period: "Septiembre 2025", status: "En progreso", desc: "UHE operativa para formación", color: "indigo" },
                                        { period: "Diciembre 2025", status: "Planificado", desc: "SuiteDO completa y monetización", color: "zinc" }
                                    ].map((milestone, idx) => (
                                        <div key={idx} className="relative flex items-center space-x-6">
                                            <div className={`absolute -left-20 w-4 h-4 bg-${milestone.color}-400 rounded-full border-4 border-slate-900`}></div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 mb-2">
                                                    <h4 className="font-medium text-white">{milestone.period}</h4>
                                                    <span className={`px-2 py-1 text-xs rounded-full bg-${milestone.color}-400/10 text-${milestone.color}-400 border border-${milestone.color}-400/30`}>
                                                        {milestone.status}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-400 text-sm">{milestone.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            
            
        </div>
    )
}
 */