import { motion } from 'framer-motion';
import { Icon } from './Icon';
import clsx from 'clsx'; // Asegúrate de instalar clsx si no está
import { twMerge } from 'tailwind-merge';

export const Sidebar = ({ onNewSearch, activeView, setActiveView }) => {

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
        { id: 'database', label: 'Base de Datos', icon: 'database' },
        { id: 'reports', label: 'Reportes', icon: 'filetext' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-dark-card border-r border-dark-border flex flex-col p-6 z-20 shadow-2xl">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-10"
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-secondary to-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
                    <span className="font-bold text-white text-md">D</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-dark-text leading-none">
                        DATA_PATENTS
                    </h1>
                    <span className="text-xs font-semibold text-brand-primary tracking-widest">AHQ INTELLIGENCE</span>
                </div>
            </motion.div>

            {/* New Search Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNewSearch}
                className="group relative overflow-hidden bg-gradient-to-r from-brand-primary to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center gap-3 mb-10 shadow-lg shadow-brand-primary/25 transition-all hover:shadow-brand-primary/40"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
                <Icon name="plus" size={20} className="text-white" />
                <span>Nueva Búsqueda</span>
            </motion.button>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <motion.div
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={twMerge(
                                "relative flex items-center gap-3 p-3.5 rounded-xl font-medium cursor-pointer transition-all duration-200 group overflow-hidden",
                                isActive
                                    ? "text-white bg-white/5"
                                    : "text-dark-muted hover:text-dark-text hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-brand-secondary/20 to-brand-primary/10 border-l-4 border-brand-primary rounded-r-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <Icon
                                name={item.icon}
                                size={20}
                                className={clsx("relative z-10 transition-colors", isActive ? "text-brand-primary" : "text-dark-muted group-hover:text-white")}
                            />
                            <span className="relative z-10">{item.label}</span>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Footer / Settings */}
            <div className="mt-auto pt-6 border-t border-dark-border">
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-3 text-dark-muted hover:text-white transition-colors w-full p-2 rounded-lg hover:bg-white/5"
                >
                    <Icon name="settings" size={18} />
                    <span className="text-sm font-medium">Configuración</span>
                </button>
            </div>
        </aside>
    );
};
