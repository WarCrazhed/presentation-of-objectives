import { useState } from 'react';

export const SubscriptionAccounts = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const accounts = [
        { name: "Orderly", category: "Software", icon: "📋", count: 5, paidCount: 5 },
        { name: "Claude", category: "IA", icon: "🤖", count: 4, paidCount: 1 },
        { name: "Gemini", category: "IA", icon: "✨", count: 2, paidCount: 1 },
        { name: "Gemini API", category: "IA", icon: "✨", count: 1, paidCount: 1 },
        { name: "Google One", category: "Correo/Almacenamiento", icon: "📧", count: 1, paidCount: 1 },
        { name: "Gmail", category: "Correo", icon: "📧", count: 11, paidCount: 0 },
        { name: "Odoo", category: "ERP", icon: "🏢", count: 2, paidCount: 1 },
        { name: "Resend", category: "Correo", icon: "📤", count: 1, paidCount: 1 },
        { name: "Manychat", category: "Marketing", icon: "💬", count: 1, paidCount: 1 },
        { name: "Zoom", category: "Videoconferencias", icon: "📹", count: 1, paidCount: 1 },
        { name: "Calendly", category: "Citas", icon: "📅", count: 1, paidCount: 0 },
        { name: "Cámara de Comercio", category: "Cámara", icon: "🏛️", count: 1, paidCount: 0 },
        { name: "Canva", category: "Diseño", icon: "🎨", count: 3, paidCount: 0 },
        { name: "ChatGPT", category: "IA", icon: "💬", count: 3, paidCount: 1 },
        { name: "Círculos Empresariales", category: "Cámara", icon: "🔄", count: 1, paidCount: 0 },
        { name: "Coparmex", category: "Cámara", icon: "🏢", count: 1, paidCount: 0 },
        { name: "Corporate Growth", category: "Cámara", icon: "📈", count: 1, paidCount: 0 },
        { name: "Correo", category: "Correo", icon: "📧", count: 1, paidCount: 0 },
        { name: "Elevel Labs", category: "Educación", icon: "🎓", count: 1, paidCount: 0 },
        { name: "Event Brite", category: "Eventos", icon: "🎟️", count: 1, paidCount: 0 },
        { name: "Facebook", category: "Red Social", icon: "📘", count: 1, paidCount: 0 },
        { name: "Instagram", category: "Red Social", icon: "📸", count: 1, paidCount: 0 },
        { name: "LinkedIn", category: "Red Social", icon: "💼", count: 2, paidCount: 0 },
        { name: "Trello", category: "Gestión", icon: "📋", count: 1, paidCount: 0 },
        { name: "YouTube", category: "Video", icon: "▶️", count: 1, paidCount: 0 },
        { name: "Docusing", category: "Legal", icon: "📄", count: 1, paidCount: 0 },
        { name: "Amazon", category: "Servicios", icon: "🛒", count: 1, paidCount: 0 },
        { name: "PlayStore", category: "Aplicaciones", icon: "📱", count: 1, paidCount: 0 },
        { name: "Oxxo Gas", category: "Combustible", icon: "⛽", count: 1, paidCount: 0 },
        { name: "Volaris", category: "Viajes", icon: "✈️", count: 1, paidCount: 0 },
        { name: "Cemefi", category: "Cámara", icon: "🏛️", count: 1, paidCount: 0 },
        { name: "CUCEA", category: "Convenios", icon: "🤝", count: 1, paidCount: 0 },
        { name: "Soni", category: "Servicios", icon: "🔊", count: 1, paidCount: 0 },
        { name: "NotebookLM", category: "Herramienta de IA", icon: "🔊", count: 1, paidCount: 1 }
    ];

    const categories = [...new Set(accounts.map(a => a.category))];

    const filteredAccounts = selectedCategory
        ? accounts.filter(a => a.category === selectedCategory)
        : accounts;

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    return (
        <div className="flex flex-col min-h-screen bg-radial-[at_50%_75%] from-violet-100 via-zinc-100 to-purple-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90% py-20">
            <div className="container m-auto p-8">
                <div className="mb-12">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-600 mb-4">
                        Cuentas de Suscripción
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-300">
                        {selectedCategory ? `${selectedCategory}` : 'Registro de servicios y plataformas con suscripciones.'}
                    </p>
                </div>

                <div className="mb-8">
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                                Total de cuentas únicas: {accounts.length}
                            </h2>
                            {selectedCategory && (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 font-medium"
                                >
                                    ← Ver todas
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categories.map((category) => {
                                const count = accounts.filter(a => a.category === category).length;
                                const isActive = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`rounded-xl p-3 text-center transition-all ${
                                            isActive
                                                ? 'bg-purple-500 text-white shadow-lg'
                                                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-100 dark:hover:bg-purple-900/30'
                                        }`}
                                    >
                                        <p className={`text-xs uppercase ${isActive ? 'text-purple-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                                            {category}
                                        </p>
                                        <p className={`text-2xl font-black ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`}>
                                            {count}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                        <thead className="bg-violet-50 dark:bg-violet-900/30">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Icono</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Servicio</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Categoría</th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Cuentas</th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">Pagadas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                            {filteredAccounts.sort((a, b) => a.name.localeCompare(b.name)).map((account, index) => (
                                <tr key={index} className="hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-colors">
                                    <td className="px-4 py-3 text-2xl">{account.icon}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">{account.name}</td>
                                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                                            {account.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
                                        {account.count}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {account.paidCount > 0 ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">
                                                {account.paidCount}
                                            </span>
                                        ) : (
                                            <span className="text-zinc-400 dark:text-zinc-600">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};