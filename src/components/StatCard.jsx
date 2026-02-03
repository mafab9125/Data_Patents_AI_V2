import { Icon } from './Icon';

export const StatCard = ({ label, value, subtext, icon, onClick }) => (
    <div
        onClick={onClick}
        className={`
            bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg relative overflow-hidden group transition-all duration-300
            ${onClick ? 'cursor-pointer hover:border-brand-primary/50 hover:shadow-brand-primary/10 hover:-translate-y-1' : ''}
        `}
    >
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors"></div>

        <div className="flex items-center gap-4 relative z-10">
            <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center shadow-inner transition-colors duration-300
                ${onClick ? 'bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white' : 'bg-white/5 text-dark-muted'}
            `}>
                <Icon name={icon} size={24} />
            </div>

            <div className="flex-1">
                <div className="text-3xl font-bold text-white tracking-tight mb-1">{value}</div>
                <div className="text-xs text-dark-muted font-medium flex items-center gap-1 uppercase tracking-wider">
                    {label}
                    {onClick && <Icon name="chevron-right" size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1 group-hover:ml-0" />}
                </div>
                {subtext && <div className="text-[10px] text-brand-accent mt-1.5 font-medium">{subtext}</div>}
            </div>
        </div>
    </div>
);
