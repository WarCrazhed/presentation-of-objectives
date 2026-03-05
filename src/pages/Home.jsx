import { QRCodeSVG } from 'qrcode.react';

export const Home = () => {
    return (
        <div className="flex flex-col h-screen bg-radial-[at_50%_75%] from-sky-100 via-zinc-100 to-slate-100 dark:from-slate-800 dark:via-zinc-900 dark:to-zinc-950 to-90%">
            <div className="container m-auto p-4 flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-indigo-600 mb-2">
                        Funcionalidad Tecnológica
                    </h1>
                    <p className="text-2xl font-bold text-zinc-600 dark:text-zinc-300">José Mario Zamora</p>
                </div>

                <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-lime-500/20 backdrop-blur-sm group transition-all hover:scale-105">
                    <QRCodeSVG
                        value="https://presentation-of-objectives.netlify.app/"
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#18181b"}
                        level={"H"}
                        includeMargin={false}
                    />
                    <p className="text-[10px] text-zinc-400 mt-2 font-bold text-center uppercase tracking-widest">Escanear para acceder</p>
                </div>
            </div>
        </div>
    )
}
