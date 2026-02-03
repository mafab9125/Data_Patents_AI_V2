import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { useToken } from '../context/TokenContext';
import { validateToken } from '../services/huggingFace';

export const TokenModal = ({ isOpen, onClose }) => {
    const { updateToken } = useToken();
    const [inputToken, setInputToken] = useState('');
    const [validating, setValidating] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidating(true);
        setError('');

        if (!inputToken.trim()) {
            setError('Por favor ingresa un token.');
            setValidating(false);
            return;
        }

        const result = await validateToken(inputToken.trim());
        if (result.valid) {
            updateToken(inputToken.trim());
            onClose(); // Close on success
        } else {
            setError(result.error || 'Token inválido o expirado. Verifica tus permisos.');
        }
        setValidating(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-dark-card border border-dark-border w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-dark-muted hover:text-white transition-colors"
                >
                    <Icon name="x" size={24} />
                </button>
                {/* Decorative background glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/20 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-secondary/20 blur-3xl rounded-full pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
                        <Icon name="settings" size={32} className="text-brand-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Configuración Inicial</h2>
                    <p className="text-dark-muted">
                        Para utilizar el motor semántico de PatentSBERTa_V2, necesitamos tu token de acceso de Hugging Face.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-dark-muted uppercase tracking-wider mb-2">
                            Access Token (Read)
                        </label>
                        <input
                            type="password"
                            value={inputToken}
                            onChange={(e) => setInputToken(e.target.value)}
                            placeholder="hf_..."
                            className="w-full bg-black/20 border border-dark-border rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm"
                        >
                            <Icon name="alert-circle" size={16} /> {/* Generic alert icon usage if available, else standard will perform */}
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={validating}
                        className="w-full bg-gradient-to-r from-brand-primary to-blue-600 hover:from-blue-600 hover:to-brand-primary text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {validating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Validando...</span>
                            </>
                        ) : (
                            <span>Conectar y Continuar</span>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-dark-muted relative z-10">
                    <p>¿No tienes un token?</p>
                    <a
                        href="https://huggingface.co/settings/tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:text-brand-secondary transition-colors underline decoration-brand-primary/30 underline-offset-4"
                    >
                        Obtén uno gratis en Hugging Face
                    </a>
                </div>
            </motion.div>
        </div>
    );
};
