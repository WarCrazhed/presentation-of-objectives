import { platforms } from '../data/platforms';
import { Cap, Doc } from '../components/icons';
import { FootNote, SlideHeader, Stat, StatStrip } from '../components/ui';

export const PeriodActivity = () => {
    // Los números se derivan de platforms.js (misma fuente que "Uso de Plataformas")
    // para que ambos slides siempre cuadren. Solo registros de agosto y septiembre 2026.
    const byName = (name) => platforms.find((p) => p.name === name)?.records ?? [];

    const talento = byName("Talento");
    const suitedo = byName("Suitedo");
    const uhe = byName("UHE");
    const blogs = byName("Página Web");

    const strip = (name) => name.includes("|") ? name.split("|").slice(1).join("|").trim() : name;

    const vacantes = talento.filter((r) => r.name.startsWith("Vacante"));
    const candidatos = talento.filter((r) => r.name.startsWith("Candidato"));
    const programas = uhe.filter((r) => r.name.startsWith("Programa"));
    const modulos = uhe.filter((r) => r.name.startsWith("Módulo"));

    const kpis = [
        { label: "Candidatos", value: candidatos.length, hint: "Talento" },
        { label: "Vacantes", value: vacantes.length, hint: "Talento" },
        { label: "Diagnósticos", value: suitedo.length, hint: "SuiteDO" },
        { label: "Programas", value: programas.length, hint: "UHE" },
        { label: "Módulos", value: modulos.length, hint: "UHE" },
        { label: "Blogs", value: blogs.length, hint: "Humana11" },
    ];

    const listas = [
        { title: "Programas y módulos — UHE", icon: Cap, items: programas.concat(modulos) },
        { title: "Blogs publicados — Humana11", icon: Doc, items: blogs },
    ];

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="03"
                eyebrow="periodo"
                title="Actividad del periodo"
                description="Registros de agosto y septiembre 2026 en las plataformas del ecosistema."
            />

            <StatStrip className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {kpis.map(({ label, value, hint }) => (
                    <Stat key={label} label={label} value={value} hint={hint} />
                ))}
            </StatStrip>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {listas.map((lista) => (
                    <div key={lista.title} className="flex flex-col rounded-lg border border-line bg-panel p-5">
                        <div className="flex items-center gap-2.5 pb-3">
                            <lista.icon className="size-4 text-accent" />
                            <h2 className="text-sm font-semibold">{lista.title}</h2>
                            <span className="num text-[11px] text-faint">{lista.items.length}</span>
                        </div>
                        <ul className="flex flex-col">
                            {lista.items.map((item) => (
                                <li key={item.name} className="flex gap-2.5 border-t border-line-soft py-2">
                                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                                    <span className="text-xs leading-relaxed text-muted">{strip(item.name)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <FootNote>los conteos se derivan de la misma fuente que «uso de plataformas»</FootNote>
        </div>
    );
};
