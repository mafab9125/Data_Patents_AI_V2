import { Icon } from './Icon';

export const ReportsView = () => {
    // Datos simulados para los reportes visuales (en una app real vendrían de props)
    const topPatents = Array.from({ length: 10 }).map((_, i) => ({
        id: `US${2023000 + i}`,
        score: 0.95 - (i * 0.05),
        title: `Patente Ejemplo ${i + 1} de Alta Similitud`
    }));

    const downloadReport = () => {
        alert("Generando reporte PDF con gráficos... (Simulación)");
    };

    return (
        <div className="animate-fade-in p-4 space-y-8">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Reportes de Inteligencia</h2>
                <p className="text-slate-500">Visualización avanzada de resultados y conexiones semánticas</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico Top 10 Similitud */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-6 text-brand-dark">
                        <Icon name="award" size={24} />
                        <h3 className="text-lg font-bold">Top 10: Mayor Similitud</h3>
                    </div>
                    <div className="space-y-3">
                        {topPatents.map((p, i) => (
                            <div key={p.id} className="relative group cursor-default">
                                <div className="flex justify-between text-xs mb-1 text-slate-600 font-medium z-10 relative">
                                    <span className="truncate pr-2 w-3/4">{i + 1}. {p.title}</span>
                                    <span>{Math.round(p.score * 100)}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-brand-accent rounded-full transition-all duration-1000 group-hover:brightness-110"
                                        style={{ width: `${p.score * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gráfico de Red Semántica (Simulado Visualmente) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex items-center gap-2 mb-6 text-brand-dark">
                        <Icon name="share2" size={24} />
                        <h3 className="text-lg font-bold">Red de Conexión Semántica</h3>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden flex items-center justify-center p-8 group">
                        {/* Simulación visual de nodos conectados */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent"></div>

                        <div className="relative w-64 h-64 animate-spin-slow">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full"
                                    style={{
                                        transform: `rotate(${i * 60}deg) translate(100px) rotate(-${i * 60}deg)`,
                                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
                                    }}>
                                    <div className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-blue-200 -z-10 origin-left"
                                        style={{ transform: `rotate(${180 + i * 10}deg)` }}></div>
                                </div>
                            ))}
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-brand-accent rounded-full -translate-x-2 -translate-y-2 shadow-lg shadow-lime-400/50 z-10"></div>
                        </div>

                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400">
                            Visualización de clusters semánticos
                        </div>
                    </div>
                    <button onClick={downloadReport} className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                        Descargar Análisis Completo
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center shadow-xl">
                <div className="mb-4 flex justify-center text-brand-accent">
                    <Icon name="filetext" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Generar Reporte Ejecutivo</h3>
                <p className="text-slate-300 max-w-xl mx-auto mb-6">
                    Exporta todos los gráficos y análisis actuales en un documento PDF listo para presentar. Incluye métricas de rendimiento y distribución geográfica.
                </p>
                <button
                    onClick={downloadReport}
                    className="px-8 py-3 bg-brand-accent text-brand-dark rounded-xl font-bold hover:bg-brand-accentHover transition-colors shadow-lg shadow-lime-400/20 active:scale-95 transform"
                >
                    Descargar PDF
                </button>
            </div>
        </div>
    );
};
