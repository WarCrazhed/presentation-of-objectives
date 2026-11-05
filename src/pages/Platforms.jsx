import { useState } from "react";
import { periodo, platforms } from "../data/platforms";
import { Delta, FootNote, SearchField, SlideHeader, Stat, StatStrip, StatusChip } from "../components/ui";

// Los nombres traen un prefijo de tipo («Programa | …»); en la ficha sobra.
const strip = (name) => name.includes('|') ? name.split('|').slice(1).join('|').trim() : name;

export const Platforms = () => {
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();
    const filtered = q
        ? platforms
            .map((p) => {
                const records = p.records.filter((r) => `${r.name} ${r.status}`.toLowerCase().includes(q));
                const metrics = p.metrics.filter((m) => m.label.toLowerCase().includes(q));
                return records.length || metrics.length || p.name.toLowerCase().includes(q) ? { ...p, records } : null;
            })
            .filter(Boolean)
        : platforms;

    // Una cifra principal por plataforma (la marcada como destacada en platforms.js).
    const destacadas = platforms.flatMap((p) =>
        p.metrics.filter((m) => m.destacada).map((m) => ({ ...m, platform: p.name }))
    );

    return (
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 sm:px-7 md:py-14">
            <SlideHeader
                number="02"
                eyebrow="plataformas"
                title="Uso de plataformas"
                description={`Uso real del ecosistema en ${periodo.etiqueta}${periodo.corte ? ` (${periodo.corte})` : ''}, comparado con ${periodo.anterior}.`}
            >
                <SearchField value={query} onChange={setQuery} placeholder="Buscar plataforma, cifra o registro…" />
            </SlideHeader>

            <StatStrip className="grid-cols-2 lg:grid-cols-4">
                {destacadas.map((m) => (
                    <Stat
                        key={m.platform}
                        label={m.label}
                        value={m.value}
                        hint={<><span className="text-faint">{m.platform} · </span><Delta value={m.value} prev={m.prev} /></>}
                    />
                ))}
            </StatStrip>

            {filtered.length === 0 && (
                <p className="rounded-lg border border-line glass px-4 py-10 text-center text-sm text-dim">
                    No se encontraron resultados para «{query}».
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filtered.map((platform) => (
                    <div key={platform.id} className="flex flex-col overflow-hidden rounded-lg border border-line glass">
                        <div className="flex items-center gap-3 border-b border-line bg-panel-2 px-4 py-3.5">
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

                        <dl className="grid grid-cols-2 gap-px border-b border-line-soft sm:grid-cols-3">
                            {platform.metrics.map((m) => (
                                <div key={m.label} className="flex flex-col gap-0.5 px-4 py-2.5">
                                    <dt className="truncate text-[10px] text-dim" title={m.hint ?? m.label}>{m.label}</dt>
                                    <dd className="flex items-baseline gap-2">
                                        <span className="num text-base font-medium text-ink">{m.value}</span>
                                        <Delta value={m.value} prev={m.prev} />
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {platform.records.length > 0 && (
                            <div className="max-h-[18rem] overflow-y-auto">
                                {platform.records.map((record, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 border-b border-line-soft px-4 py-2.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-xs" title={strip(record.name)}>{strip(record.name)}</p>
                                            <p className="num mt-0.5 text-[10px] text-dim">
                                                {record.date_end ? `${record.date_start} → ${record.date_end}` : record.date_start}
                                            </p>
                                        </div>
                                        <StatusChip status={record.status} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <FootNote>cifras agregadas, sin datos personales · variación contra el mismo número de días del periodo anterior</FootNote>
        </div>
    );
};
