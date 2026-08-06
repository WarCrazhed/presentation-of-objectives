import { platforms } from "../data/platforms";

export const Platforms = () => {
    const getStatusColor = (status) => {
        const colors = {
            'Completado': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
            'En Proceso': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
            'Publicado': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            'Activo': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
            'Cerrado': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
        };
        return colors[status] || 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
    };

    const formatDate = (date) => {
        if (!date) return 'En curso';
        return date;
    };

    return (
        <div className="min-h-screen py-12 md:py-20">
            <div className="container mx-auto p-4 md:p-6 space-y-8">
                {/* Header */}
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white">
                        Uso de Plataformas
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300">
                        Seguimiento de actividades y diagnósticos
                    </p>
                </div>

                {/* Platforms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    {platforms.map((platform) => (
                        <div
                            key={platform.id}
                            className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Platform Header */}
                            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-xl p-2 shadow-md">
                                        <img
                                            src={platform.img}
                                            alt={platform.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/64?text=Logo';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                                            {platform.name}
                                        </h2>
                                        <p className="text-zinc-600 dark:text-zinc-400">
                                            {platform.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-zinc-500 dark:text-zinc-400">
                                        Total registros: {platform.records.length}
                                    </span>
                                    <span className="px-3 py-1 bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-300 rounded-full text-xs font-medium">
                                        {platform.records.filter(r => r.status === 'En Proceso').length} en proceso
                                    </span>
                                </div>
                            </div>

                            {/* Records List */}
                            <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                                {platform.records.map((record, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 hover:border-lime-400 dark:hover:border-lime-700 transition-all duration-200"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm md:text-base">
                                                    {record.name}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Inicio: {formatDate(record.date_start)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Fin: {formatDate(record.date_end)}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: 'Total Plataformas', value: platforms.length, color: 'from-zinc-500 to-zinc-700' },
                        { label: 'Total Registros', value: platforms.reduce((acc, p) => acc + p.records.length, 0), color: 'from-lime-500 to-lime-700' },
                        { label: 'En Proceso', value: platforms.reduce((acc, p) => acc + p.records.filter(r => r.status === 'En Proceso').length, 0), color: 'from-zinc-400 to-zinc-600' },
                        { label: 'Completados', value: platforms.reduce((acc, p) => acc + p.records.filter(r => r.status === 'Completado' || r.status === 'Publicado').length, 0), color: 'from-lime-600 to-lime-800' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                            <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};