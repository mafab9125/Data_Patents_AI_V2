import { getCountryStats } from '../utils';

export const CountryAnalysis = ({ patents, onClose }) => {
    const stats = getCountryStats(patents);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">Análisis por País</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <p className="text-slate-500 mb-6">Distribución de las {patents.length} patentes activas según su oficina de origen.</p>

                    <div className="space-y-4">
                        {stats.map((item, index) => (
                            <div key={item.name} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{item.flag}</span>
                                        <span className="font-medium text-slate-700">{item.name}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="font-bold text-slate-800">{item.count}</span>
                                        <span className="text-slate-400 w-12 text-right">{item.percentage}%</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-accent rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}

                        {stats.length === 0 && (
                            <div className="text-center py-10 text-slate-400">
                                No hay datos disponibles para mostrar.
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-sm"
                    >
                        Cerrar Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};
