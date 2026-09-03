import { Fragment, useState } from 'react';
import { MONTHS, strategicObjectives } from '../data/objectives';
import { FootNote, SearchField, SlideHeader, Stat, StatStrip } from '../components/ui';

export const StrategicObjective = () => {
    const [query, setQuery] = useState('');

    const isMonthActive = (initiativeMeses, monthIndex) => {
        return initiativeMeses?.includes(monthIndex) || false;
    };

    const q = query.trim().toLowerCase();
    const filteredObjectives = q
        ? strategicObjectives
            .map((objective) => {
                const objMatch = `${objective.id} ${objective.name} ${objective.description}`.toLowerCase().includes(q);
                if (objMatch) return objective;
                const initiatives = objective.initiatives.filter((it) =>
                    `${it.id} ${it.name} ${it.meta ?? ''} ${it.responsable ?? ''}`.toLowerCase().includes(q)
                );
                return initiatives.length ? { ...objective, initiatives } : null;
            })
            .filter(Boolean)
        : strategicObjectives;

    const todas = strategicObjectives.flatMap((o) => o.initiatives);
    const completadas = todas.filter((i) => i.avance === 1).length;
    const enCurso = todas.filter((i) => i.avance != null && i.avance < 1).length;
    const porIniciar = todas.length - completadas - enCurso;

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="04"
                eyebrow="objetivos"
                title="Objetivos estratégicos"
                description="Objetivos e iniciativas del departamento de Funcionalidad Tecnológica y los meses comprometidos."
            >
                <div className="flex flex-col items-start gap-2 md:items-end">
                    <SearchField
                        value={query}
                        onChange={setQuery}
                        placeholder="Buscar objetivo, iniciativa o responsable…"
                    />
                    <div className="flex items-center gap-3 text-[11px] text-muted">
                        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-accent" />completado</span>
                        <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-[2px] bg-accent-soft" />planeado</span>
                    </div>
                </div>
            </SlideHeader>

            <StatStrip className="grid-cols-2 lg:grid-cols-4">
                <Stat label="Objetivos" value={strategicObjectives.length} />
                <Stat label="Iniciativas" value={todas.length} />
                <Stat label="Completadas" value={completadas} hint={`${Math.round(completadas / todas.length * 100)}% del total`} accent />
                <Stat label="En curso / por iniciar" value={`${enCurso} / ${porIniciar}`} />
            </StatStrip>

            <div className="overflow-x-auto rounded-lg border border-line bg-panel">
                <table className="w-full min-w-[1100px] border-collapse">
                    <thead>
                        <tr className="bg-panel-2 font-mono text-[10px] uppercase tracking-wide text-dim">
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-4 py-2 text-left font-normal">Objetivo / iniciativa</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Meta</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Responsable</th>
                            <th scope="col" className="sticky top-0 z-20 border-b border-line bg-panel-2 px-2 py-2 text-left font-normal">Avance</th>
                            {MONTHS.map((month, index) => (
                                <th key={index} scope="col" className="sticky top-0 z-20 w-7 border-b border-line bg-panel-2 px-0 py-2 text-center font-normal">
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredObjectives.length === 0 && (
                            <tr>
                                <td colSpan={16} className="px-4 py-10 text-center text-sm text-dim">
                                    No se encontraron resultados para «{query}».
                                </td>
                            </tr>
                        )}
                        {filteredObjectives.map((objective) => (
                            <Fragment key={objective.id}>
                                <tr className="bg-panel-2">
                                    <td className="border-y border-line px-4 py-2" colSpan={16}>
                                        <span className="num mr-2 text-[11px] text-accent">{objective.id}</span>
                                        <span className="text-xs font-semibold">{objective.name}</span>
                                        <span className="ml-2 text-[11px] text-dim">{objective.description}</span>
                                    </td>
                                </tr>

                                {objective.initiatives.map((initiative) => {
                                    const done = initiative.avance === 1;
                                    const pct = initiative.avance == null ? null : Math.round(initiative.avance * 100);
                                    return (
                                        <tr key={initiative.id} className="border-b border-line-soft transition-colors hover:bg-panel-2">
                                            <td className="py-1.5 pl-7 pr-4 text-xs">
                                                <span className="num mr-2 text-[11px] text-faint">{initiative.id}</span>
                                                {initiative.name}
                                            </td>
                                            <td className="num px-2 py-1.5 text-[11px] text-muted">{initiative.meta ?? '—'}</td>
                                            <td className="px-2 py-1.5 text-xs text-muted">{initiative.responsable ?? '—'}</td>
                                            <td className={`num px-2 py-1.5 text-[11px] ${pct === null ? 'text-faint' : pct === 100 ? 'text-accent' : 'text-warn'}`}>
                                                {pct === null ? '—' : `${pct}%`}
                                            </td>
                                            {MONTHS.map((_, index) => (
                                                <td key={index} className="px-0.5 py-1.5">
                                                    <span
                                                        className={`block h-3 rounded-[2px] ${isMonthActive(initiative.meses, index) ? (done ? 'bg-accent' : 'bg-accent-soft') : 'bg-cell'}`}
                                                        title={isMonthActive(initiative.meses, index) ? 'Mes comprometido' : 'Sin actividad'}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <FootNote>avance en % · rejilla = meses comprometidos</FootNote>
        </div>
    );
};
