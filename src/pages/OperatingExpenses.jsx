export const OperatingExpenses = () => {
    const expenses = [
        {
            name: "Servicio en la nube (itfoundry)",
            amount: 4034.70,
            currency: "MXN",
            period: "Mensual",
            description: "Alojamiento de plataformas, base de datos y archivos.",
            status: "Pagado",
            icon: "☁️"
        },
        {
            name: "Nómina",
            amount: 44000.00,
            currency: "MXN",
            period: "Mensual",
            description: "Compensación del equipo de Funcionalidad Tecnológica.",
            status: "Pagado",
            icon: "👥"
        },
        {
            name: "Resend (Envío de correos)",
            amount: 732.62,
            currency: "MXN",
            period: "Mensual",
            description: "Servicio de infraestructura de correo electrónico.",
            status: "Pagado",
            icon: "📧"
        },
        {
            name: "Gemini API",
            amount: 0.00,
            currency: "MXN",
            period: "Variable",
            description: "Servicios de Inteligencia Artificial para aplicaciones.",
            status: "Versión Pro",
            icon: "✨"
        },
        {
            name: "Gemini AI",
            amount: 2000.00,
            currency: "MXN",
            period: "Mensual",
            description: "Inteligencia Artificial.",
            status: "Versión Pro",
            icon: "✨"
        }
    ];

    const totalMonthlyMXN = expenses
        .filter(e => e.currency === "MXN")
        .reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="flex flex-col min-h-screen bg-radial-[at_50%_75%] from-sky-100 via-zinc-100 to-slate-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
            <div className="container m-auto p-8">
                <div className="mb-12">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-indigo-600 mb-4">
                        Gastos Operativos
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300">
                        Desglose de inversión y costos fijos del departamento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {expenses.map((expense, index) => (
                        <div key={index} className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-4xl">{expense.icon}</span>
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${expense.status === "Pagado" ? "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400" :
                                    expense.status === "Pendiente de pago" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                        "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                    }`}>
                                    {expense.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-1">{expense.name}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 h-10 line-clamp-2">{expense.description}</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                    {expense.amount.toLocaleString('es-MX', { style: 'currency', currency: expense.currency })}
                                </span>
                                <span className="text-xs font-bold text-zinc-400 uppercase">{expense.currency}</span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1">{expense.period}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-indigo-100 font-medium uppercase tracking-widest text-sm">Resumen de Inversión Mensual</h4>
                        <p className="text-3xl md:text-5xl font-black">
                            {totalMonthlyMXN.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                        <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center text-zinc-900">
                            <span className="font-bold">✓</span>
                        </div>
                        <p className="text-sm font-medium leading-tight">
                            Presupuesto actualizado <br />
                            <span className="text-indigo-200">Sincronizado con Administración</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};