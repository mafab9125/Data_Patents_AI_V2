import { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

export const SemanticMap = ({ patents, onPatentClick }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Coordenadas simuladas deterministas basadas en ID y Tags
    const getCoords = (p) => {
        const seed = p.id.charCodeAt(3) + (p.id.length * 5);
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

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        const newScale = Math.min(Math.max(0.5, scale + delta), 4);
        setScale(newScale);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handlePatentClick = (patent) => {
        if (onPatentClick) {
            onPatentClick(patent);
        }
    };

    return (
        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border shadow-lg mb-8 animate-fade-in relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Mapa Semántico de Patentes</h3>
                    <p className="text-xs text-dark-muted">Explora clusters tecnológicos. Usa scroll para zoom y arrastra para mover.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setScale(s => Math.min(s + 0.5, 4))} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                        <Icon name="plus" size={16} />
                    </button>
                    <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                        <Icon name="minus" size={16} />
                    </button>
                    <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors" title="Reset View">
                        <Icon name="maximize" size={16} />
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="h-96 w-full bg-dark-bg/50 rounded-xl relative border border-white/5 overflow-hidden cursor-move"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="absolute inset-0 origin-center transition-transform duration-100 ease-out"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
                    }}
                >
                    {/* Grid Overlay inside scalable area */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-30">
                        {[...Array(36)].map((_, i) => <div key={i} className="border-white/5 border-[0.5px]"></div>)}
                    </div>

                    {patents.map(p => {
                        const { x, y } = getCoords(p);
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
                                onClick={(e) => { e.stopPropagation(); handlePatentClick(p); }}
                                className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full ${colorClass} shadow-[0_0_12px_currentColor] border border-white/40 cursor-pointer hover:scale-150 hover:z-50 transition-all duration-300 group z-10 flex items-center justify-center`}
                                style={{ left: `${x}%`, top: `${y}%` }}
                            >
                                {/* Dot Core */}
                                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />

                                {/* Tooltip */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-dark-card border border-dark-border text-white text-[10px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all duration-200 shadow-xl z-50">
                                    <div className="font-bold text-brand-primary mb-0.5">{p.id}</div>
                                    <div className="font-medium max-w-[150px] truncate">{p.title}</div>
                                    <div className="text-xs text-dark-muted mt-1 uppercase tracking-wider">Click para ver</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 flex gap-4 text-xs font-medium justify-center">
                <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>Digital / Tech</span>
                <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>Energía / Materiales</span>
                <span className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-brand-secondary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>Bio / Salud</span>
            </div>
        </div>
    );
};
