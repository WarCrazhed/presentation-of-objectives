import { useState } from "react";
import { platforms } from "../data/platforms";
import { FootNote, SearchField, SlideHeader, Stat, StatStrip, StatusChip } from "../components/ui";

const formatDate = (date) => date || 'En curso';

// Los nombres traen un prefijo de tipo («Programa | …»); en la ficha sobra.
const strip = (name) => name.includes('|') ? name.split('|').slice(1).join('|').trim() : name;

export const Platforms = () => {
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();
    const filtered = q
        ? platforms
            .map((p) => {
                const records = p.records.filter((r) => `${r.name} ${r.status}`.toLowerCase().includes(q));
                return records.length || p.name.toLowerCase().includes(q) ? { ...p, records } : null;
            })
            .filter(Boolean)
        : platforms;

    const totalRegistros = platforms.reduce((acc, p) => acc + p.records.length, 0);
    const enProceso = platforms.reduce((acc, p) => acc + p.records.filter((r) => r.status === 'En Proceso').length, 0);
    const completados = platforms.reduce(
        (acc, p) => acc + p.records.filter((r) => r.status === 'Completado' || r.status === 'Publicado').length, 0
    );

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="02"
                eyebrow="plataformas"
                title="Uso de plataformas"
                description="Actividades y diagnósticos registrados en el ecosistema."
            >
                <SearchField value={query} onChange={setQuery} placeholder="Buscar registro o estado…" />
            </SlideHeader>

            <StatStrip className="grid-cols-2 lg:grid-cols-4">
                <Stat label="Plataformas" value={platforms.length} />
                <Stat label="Registros" value={totalRegistros} />
                <Stat label="En proceso" value={enProceso} />
                <Stat label="Completados" value={completados} accent />
            </StatStrip>

            {filtered.length === 0 && (
                <p className="rounded-lg border border-line bg-panel px-4 py-10 text-center text-sm text-dim">
                    No se encontraron resultados para «{query}».
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filtered.map((platform) => {
                    const counts = platform.records.reduce((acc, r) => {
                        acc[r.status] = (acc[r.status] ?? 0) + 1;
                        return acc;
                    }, {});

                    return (
                        <div key={platform.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-panel">
                            <div className="flex items-center justify-between gap-4 border-b border-line bg-panel-2 px-4 py-3.5">
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-panel p-1.5">
                                        <img
                                            src={platform.img}
                                            alt=""
                                            className="size-full object-contain"
                                            onError={(e) => {
                                                // Sin logo: monograma, en lugar de un placeholder externo.
                                                e.target.replaceWith(
                                                    Object.assign(document.createElement('span'), {
                                                        className: 'font-mono text-sm text-accent',
                                                        textContent: platform.name[0]
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="truncate text-sm font-semibold">{platform.name}</h2>
                                        <p className="truncate text-[11px] text-dim">{platform.description}</p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-baseline gap-1.5">
                                    <span className="num text-lg font-medium">{platform.records.length}</span>
                                    <span className="text-[10px] text-dim">registros</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 border-b border-line-soft px-4 py-2.5">
                                {Object.entries(counts).map(([status, n]) => (
                                    <span key={status} className="flex items-center gap-1.5">
                                        <StatusChip status={status} />
                                        <span className="num text-[11px] text-muted">{n}</span>
                                    </span>
                                ))}
                            </div>

                            <div className="max-h-[22rem] overflow-y-auto">
                                {platform.records.map((record, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 border-b border-line-soft px-4 py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-xs" title={strip(record.name)}>{strip(record.name)}</p>
                                            <p className="num mt-0.5 text-[10px] text-dim">
                                                {formatDate(record.date_start)} → {formatDate(record.date_end)}
                                            </p>
                                        </div>
                                        <StatusChip status={record.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <FootNote>los registros se listan tal como están capturados en cada plataforma</FootNote>
        </div>
    );
};
