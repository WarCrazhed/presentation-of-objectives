import { Bot, Cloud, Diskette, Mail, Sparkle, Users } from '../components/icons';
import { FootNote, SlideHeader, Stat, StatStrip } from '../components/ui';

// Tipo de cambio para los servicios cobrados en dólares (FIX Banxico).
const USD_MXN = 17.978;
const USD_MXN_FECHA = '7 oct 2026';

export const OperatingExpenses = () => {
    const expenses = [
        {
            name: "Servicio en la nube Vultr",
            amount: 86.40,
            currency: "USD",
            period: "Mensual",
            description: "Alojamiento de plataformas, base de datos y archivos.",
            status: "Pagado",
            icon: Cloud
        },
        {
            name: "Nómina",
            amount: 35000.00,
            currency: "MXN",
            period: "Mensual",
            description: "Compensación del equipo de Funcionalidad Tecnológica.",
            status: "Pagado",
            icon: Users
        },
        {
            name: "Resend (Envío de correos)",
            amount: 340.00,
            currency: "MXN",
            period: "Mensual",
            description: "Servicio de infraestructura de correo electrónico.",
            status: "Pagado",
            icon: Mail
        },
        {
            name: "Gemini API",
            amount: 4.32,
            currency: "MXN",
            period: "Variable",
            description: "Servicios de Inteligencia Artificial para aplicaciones.",
            status: "Versión Pro",
            icon: Sparkle
        },
        {
            name: "Claude Max (2 cuentas)",
            amount: 3680.00,
            currency: "MXN",
            period: "Mensual",
            description: "Asistente de IA para desarrollo (Claude Code). 2 cuentas del área.",
            status: "Versión Max",
            icon: Bot
        },
        {
            name: "R2 Object Storage (S3 compatible)",
            amount: 0,
            currency: "USD",
            period: "Mensual",
            description: "Almacenamiento de objetos en la nube.",
            status: "Pagado",
            icon: Diskette
        }
    ];

    const money = (n) => n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Todo se suma en pesos: los montos en USD se convierten con el FIX.
    const toMXN = (e) => (e.currency === "USD" ? e.amount * USD_MXN : e.amount);

    const recurrentes = expenses.filter((e) => e.period !== "Único");
    const unicos = expenses.filter((e) => e.period === "Único");

    const totalMonthlyMXN = recurrentes.reduce((acc, curr) => acc + toMXN(curr), 0);
    const totalOneTimeMXN = unicos.reduce((acc, curr) => acc + toMXN(curr), 0);
    const totalIA = expenses
        .filter((e) => e.name.startsWith('Gemini') || e.name.startsWith('Claude'))
        .reduce((acc, e) => acc + toMXN(e), 0);

    // Barras de magnitud, un solo tono, ordenadas de mayor a menor.
    const maxAmount = Math.max(...recurrentes.map(toMXN));
    const ranking = [...recurrentes].sort((a, b) => toMXN(b) - toMXN(a));

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="06"
                eyebrow="costos"
                title="Gastos operativos"
                description="Inversión y costos fijos del departamento."
            />

            <StatStrip className="grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2 cell-divider px-5 py-5 max-lg:col-span-2">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-dim">Total mensual</p>
                    <p className="flex items-baseline gap-2.5">
                        <span className="num text-4xl font-medium tracking-tight">${money(totalMonthlyMXN)}</span>
                        <span className="num text-sm text-muted">MXN</span>
                    </p>
                    <p className="text-xs text-dim">
                        <span className="num">{recurrentes.length}</span> conceptos recurrentes
                    </p>
                </div>
                <Stat label="Gasto único" value={`$${money(totalOneTimeMXN)}`} hint={`${unicos.length} concepto`} />
                <Stat label="Anualizado" value={`$${money(totalMonthlyMXN * 12)}`} hint="proyección" />
                <Stat
                    label="Herramientas IA"
                    value={`$${money(totalIA)}`}
                    hint={`${(totalIA / totalMonthlyMXN * 100).toFixed(1)}% del mes`}
                    accent
                />
            </StatStrip>

            <div className="flex flex-col gap-4 rounded-lg border border-line glass p-5">
                <h2 className="text-sm font-semibold">Peso de cada concepto en el gasto mensual</h2>
                <div className="flex flex-col gap-2.5">
                    {ranking.map((expense) => (
                        <div key={expense.name} className="grid grid-cols-[13rem_1fr] items-center gap-3 sm:grid-cols-[13rem_1fr_9rem]">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <expense.icon className="size-4 shrink-0 text-accent" />
                                <span className="truncate text-xs">{expense.name}</span>
                            </div>
                            <div className="h-3 min-w-[3px] rounded-[3px] bg-accent" style={{ width: `${toMXN(expense) / maxAmount * 100}%` }} />
                            <div className="num flex items-baseline gap-3 text-[11px] max-sm:col-span-2 max-sm:justify-end">
                                <span>${money(toMXN(expense))}</span>
                                <span className="text-dim">{(toMXN(expense) / totalMonthlyMXN * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-line glass">
                <table className="w-full min-w-[860px] border-collapse">
                    <thead>
                        <tr className="bg-panel-2 font-mono text-[10px] uppercase tracking-wide text-dim">
                            <th scope="col" className="border-b border-line px-4 py-2 text-left font-normal">Concepto</th>
                            <th scope="col" className="border-b border-line px-2 py-2 text-left font-normal">Descripción</th>
                            <th scope="col" className="border-b border-line px-2 py-2 text-left font-normal">Periodicidad</th>
                            <th scope="col" className="border-b border-line px-2 py-2 text-left font-normal">Estado</th>
                            <th scope="col" className="border-b border-line px-4 py-2 text-right font-normal">Monto MXN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.name} className="border-b border-line-soft transition-colors hover:bg-panel-2">
                                <td className="px-4 py-2">
                                    <span className="flex items-center gap-2.5 text-xs">
                                        <expense.icon className="size-4 shrink-0 text-accent" />
                                        {expense.name}
                                    </span>
                                </td>
                                <td className="px-2 py-2 text-xs text-muted">{expense.description}</td>
                                <td className="px-2 py-2">
                                    <span className="inline-flex rounded bg-panel-2 px-2 py-0.5 text-[10px] text-muted">{expense.period}</span>
                                </td>
                                <td className={`px-2 py-2 text-[11px] ${expense.status ? 'text-muted' : 'text-faint'}`}>{expense.status || '—'}</td>
                                <td className="num px-4 py-2 text-right text-xs">
                                    ${money(toMXN(expense))}
                                    {expense.currency === "USD" && (
                                        <span className="block text-[10px] text-dim">{money(expense.amount)} USD × {USD_MXN}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-panel-2">
                            <td className="border-t border-line px-4 py-2.5 text-xs font-semibold" colSpan={4}>Total mensual</td>
                            <td className="num border-t border-line px-4 py-2.5 text-right text-xs text-accent">${money(totalMonthlyMXN)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <FootNote>montos en mxn · usd convertidos a ${USD_MXN} (fix banxico, {USD_MXN_FECHA}) · el gasto único no suma al total mensual</FootNote>
        </div>
    );
};
