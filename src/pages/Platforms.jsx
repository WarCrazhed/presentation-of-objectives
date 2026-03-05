import { platforms } from "../data/platforms";

export const Platforms = () => {
    const getStatusColor = (status) => {
        const colors = {
            'Completado': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300',
            'En Proceso': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
            'Publicado': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    const formatDate = (date) => {
        if (!date) return 'En curso';
        return date;
    };

    return (
        <div className="min-h-screen bg-radial-[at_50%_75%] from-sky-100 via-zinc-100 to-slate-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-indigo-600">
                        Uso de Plataformas
                    </h1>
                    <p className="text-lg md:text-2xl font-semibold text-zinc-600 dark:text-zinc-400">
                        Seguimiento de actividades y diagnósticos
                    </p>
                </div>

                {/* Platforms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
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
                                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium">
                                        {platform.records.filter(r => r.status === 'En Proceso').length} en proceso
                                    </span>
                                </div>
                            </div>

                            {/* Records List */}
                            <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                                {platform.records.map((record, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-lime-700 transition-all duration-200"
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
                        { label: 'Total Plataformas', value: platforms.length, color: 'from-blue-500 to-blue-600' },
                        { label: 'Total Registros', value: platforms.reduce((acc, p) => acc + p.records.length, 0), color: 'from-indigo-500 to-indigo-600' },
                        { label: 'En Proceso', value: platforms.reduce((acc, p) => acc + p.records.filter(r => r.status === 'En Proceso').length, 0), color: 'from-amber-500 to-amber-600' },
                        { label: 'Completados', value: platforms.reduce((acc, p) => acc + p.records.filter(r => r.status === 'Completado' || r.status === 'Publicado').length, 0), color: 'from-lime-500 to-lime-600' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
                            <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};