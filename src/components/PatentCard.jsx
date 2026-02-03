import { motion } from 'framer-motion';
import { getCountryFromId } from '../utils';
import clsx from 'clsx';

const getPatentUrl = (id) => {
    const cleanId = id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    return `https://patents.google.com/patent/${cleanId}/en`;
};

export const PatentCard = ({ patent, score, isSelected, onToggleSelection }) => {
    // Prefer explicit country code, fallback to parsing ID
    const countryParam = patent.country || patent.id;
    const country = getCountryFromId(countryParam);
    const hasScore = score !== undefined && score > 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
            className={clsx(
                "bg-dark-card/50 backdrop-blur-md border rounded-xl p-5 relative group overflow-hidden transition-all",
                isSelected ? "border-brand-primary shadow-[0_0_20px_rgba(99,102,241,0.3)]" : "border-dark-border"
            )}
        >
            {/* Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    {/* Checkbox for selection */}
                    <div className="flex items-start gap-3">
                        <label className="flex items-center cursor-pointer mt-1">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => onToggleSelection(patent.id)}
                                className="w-5 h-5 rounded border-2 border-brand-primary/30 bg-dark-bg/50 checked:bg-brand-primary checked:border-brand-primary focus:ring-2 focus:ring-brand-primary/50 cursor-pointer transition-all"
                            />
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {/* Status Badge */}
                            <span className={clsx(
                                "px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border",
                                patent.status === 'Activo' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                    patent.status === 'Pendiente' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                        "bg-slate-500/10 text-slate-400 border-slate-500/20"
                            )}>
                                {patent.status}
                            </span>

                            {/* Country Badge */}
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-dark-text" title={`País: ${country.name}`}>
                                <span className="text-sm">{country.flag}</span>
                                <span className="hidden sm:inline opacity-80">{country.name}</span>
                            </span>
                        </div>
                    </div>

                    {/* Similarity Score */}
                    {hasScore && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-dark-muted">Relevancia</span>
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/30 px-2.5 py-1 rounded-lg">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                                </span>
                                <span className="text-xs font-bold text-brand-primary">{Math.round(score * 100)}%</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {patent.title}
                </h3>

                {/* Abstract */}
                <p className="text-slate-400 text-sm mb-5 line-clamp-3 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {patent.abstract}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-2 max-w-[70%]">
                        {patent.tags && patent.tags.map((tag, i) => (
                            <span key={i} className="text-[11px] text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-mono hidden sm:block" title="Asignado a">
                            {patent.assignee}
                        </span>
                        <a
                            href={patent.url || getPatentUrl(patent.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg transition-all"
                            title="Ver en Google Patents"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
