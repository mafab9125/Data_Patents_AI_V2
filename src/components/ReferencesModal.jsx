import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

export const ReferencesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const references = [
        {
            title: "AAUBS. (2023). PatentSBERTa_V2 [Modelo de lenguaje]. Hugging Face.",
            url: "https://huggingface.co/AAUBS/PatentSBERTa_V2"
        },
        {
            title: "Anthropic. (2024). Claude API (Versión Sonnet 4) [Software de inteligencia artificial].",
            url: "https://www.anthropic.com"
        },
        {
            title: "Fajardo-Bermúdez, M. [mafab9125]. (2026). DATA_PATENTS.AI: Aplicación web para el análisis de textos de patentes usando PatentSBERTa_V2 [Software]. Desarrollado con asistencia de Antigravity. data-patents-ai-v2.vercel.app",
            url: "https://data-patents-ai-v2.vercel.app"
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-dark-card border border-dark-border w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-dark-muted hover:text-white transition-colors"
                    >
                        <Icon name="x" size={24} />
                    </button>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                                <Icon name="book" size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Referencias</h2>
                        </div>

                        <div className="space-y-6">
                            {references.map((ref, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all group">
                                    <p className="text-dark-text text-sm leading-relaxed mb-2">
                                        {ref.title}
                                    </p>
                                    <a
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-brand-primary hover:text-brand-secondary underline underline-offset-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Ver recurso <Icon name="external-link" size={12} />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-xs text-dark-muted italic">
                                Cita este proyecto utilizando la información de arriba.
                            </p>
                        </div>
                    </div>

                    {/* Background glow */}
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full pointer-events-none" />
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
