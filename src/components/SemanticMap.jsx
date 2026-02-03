export const SemanticMap = ({ patents }) => {
    // Coordenadas simuladas deterministas basadas en ID y Tags
    const getCoords = (p) => {
        const seed = p.id.charCodeAt(3) + (p.id.length * 5);
        // Safe access to tags
        const tags = p.tags || [];
        const tag = (tags[0] || "").toLowerCase();

        let x = 50, y = 50;
        // Clustering simple por temática
        if (['energía', 'solar', 'fuel', 'batería', 'electric'].some(t => tag.includes(t) || p.title.toLowerCase().includes(t))) { x = 25; y = 75; }
        else if (['bio', 'médico', 'salud', 'farma', 'virus'].some(t => tag.includes(t) || p.title.toLowerCase().includes(t))) { x = 75; y = 25; }
        else if (['tech', 'data', 'ia', 'cyber', 'robótica', 'dron'].some(t => tag.includes(t) || p.title.toLowerCase().includes(t))) { x = 75; y = 75; }
        else if (['material', 'agua', 'eco', 'clim'].some(t => tag.includes(t) || p.title.toLowerCase().includes(t))) { x = 25; y = 25; }

        // Dispersión aleatoria determinista
        x += (seed % 30) - 15;
        y += ((seed * 7) % 30) - 15;

        // Clamp
        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        return { x, y };
    };

    return (
        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border shadow-lg mb-8 animate-fade-in relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Mapa Semántico de Patentes</h3>
                    <p className="text-xs text-dark-muted">Clusters de tecnologías por proximidad vectorial (Simulado 2D)</p>
                </div>
                <div className="flex gap-4 text-xs font-medium">
                    <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>Digital / Tech</span>
                    <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>Energía / Materiales</span>
                    <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-brand-secondary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>Bio / Salud</span>
                </div>
            </div>

            <div className="h-80 w-full bg-dark-bg/50 rounded-xl relative border border-white/5 overflow-hidden">
                {/* Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none">
                    {[...Array(36)].map((_, i) => <div key={i} className="border-white/5 border-[0.5px]"></div>)}
                </div>

                {patents.map(p => {
                    const { x, y } = getCoords(p);
                    // Safe access to tags again
                    const tags = p.tags || [];
                    const firstTag = tags[0] || "";
                    const isBio = ['bio', 'médico', 'salud', 'vacuna'].some(t => (firstTag + p.title).toLowerCase().includes(t));
                    const isTech = ['tech', 'ia', 'datos', 'cyber', 'dron'].some(t => (firstTag + p.title).toLowerCase().includes(t));

                    let colorClass = 'bg-emerald-500 shadow-emerald-500/50';
                    if (isBio) colorClass = 'bg-brand-secondary shadow-brand-secondary/50';
                    else if (isTech) colorClass = 'bg-brand-primary shadow-brand-primary/50';

                    return (
                        <div
                            key={p.id}
                            className={`absolute w-3 h-3 rounded-full ${colorClass} shadow-[0_0_12px_currentColor] border border-white/20 cursor-pointer hover:scale-150 hover:z-50 transition-all duration-300 group`}
                            style={{ left: `${x}%`, top: `${y}%` }}
                        >
                            {/* Tooltip */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-dark-card border border-dark-border text-white text-[10px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all duration-200 shadow-xl z-50">
                                <div className="font-bold mb-0.5">{p.id}</div>
                                <div className="text-dark-muted">{p.title.slice(0, 20)}...</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
