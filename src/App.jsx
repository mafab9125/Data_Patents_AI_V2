import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { PatentCard } from './components/PatentCard';
import { SemanticMap } from './components/SemanticMap';
import { StatCard } from './components/StatCard';
import { TokenModal } from './components/TokenModal';
import { DatabaseView } from './components/DatabaseView';
import { ReportsView } from './components/ReportsView';
import { CountryAnalysis } from './components/CountryAnalysis';
import { Icon } from './components/Icon';
import { INITIAL_PATENTS } from './data/patents';
import { useSemanticSearch } from './hooks/useSemanticSearch';
import { useToken } from './context/TokenContext';
import clsx from 'clsx';

function App() {
    const { token, isValid } = useToken();
    const {
        results,
        isSearching,
        searchMetrics,
        search,
        resetSearch
    } = useSemanticSearch(INITIAL_PATENTS);

    const [query, setQuery] = useState('');
    const [minScore, setMinScore] = useState(0.25);
    const [activeView, setActiveView] = useState('dashboard');
    const [showCountryAnalysis, setShowCountryAnalysis] = useState(false);

    // Initial search or reset
    useEffect(() => {
        if (!query) resetSearch();
    }, [query]);

    const handleSearch = () => {
        if (query.trim() && isValid) {
            search(query, token, minScore);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    // Calculate dynamic stats
    const activePatentsCount = results.filter(p => p.status === 'Activo').length;

    return (
        <div className="bg-dark-bg min-h-screen font-sans text-dark-text selection:bg-brand-primary/30">
            <TokenModal />

            {showCountryAnalysis && (
                <CountryAnalysis patents={results} onClose={() => setShowCountryAnalysis(false)} />
            )}

            <Sidebar
                onNewSearch={() => {
                    setQuery('');
                    resetSearch();
                    setActiveView('dashboard');
                }}
                activeView={activeView}
                setActiveView={setActiveView}
            />

            <main className="ml-64 flex-1 p-8 min-h-screen relative z-0">
                {/* Background Blobs */}
                <div className="fixed top-0 left-64 right-0 h-96 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none -z-10" />

                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            {activeView === 'dashboard' ? 'Centro de Inteligencia' :
                                activeView === 'database' ? 'Base de Datos Maestra' : 'Reportes Ejecutivos'}
                        </h2>
                        <p className="text-dark-muted mt-1">
                            {activeView === 'dashboard' ? 'Análisis semántico e insights estratégicos' : 'Gestión y exploración de activos de propiedad intelectual'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-white">Admin User</div>
                                <div className="text-xs text-dark-muted">admin@datapatents.ai</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary p-[2px]">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="User"
                                    className="w-full h-full rounded-full bg-dark-card object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {activeView === 'dashboard' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Search Section */}
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="bg-dark-card/80 backdrop-blur-xl p-1 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-0">
                                <div className="flex items-center gap-4 px-4 py-3">
                                    <Icon name="search" size={24} className="text-dark-muted" />
                                    <input
                                        type="text"
                                        placeholder="Describe tu invención (ej: 'Nanotecnología para paneles solares transparentes')..."
                                        className="flex-1 bg-transparent border-none text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={isSearching || !query.trim()}
                                        className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSearching ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            'Analizar'
                                        )}
                                    </button>
                                </div>

                                {/* Filters Sub-bar */}
                                <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-dark-muted font-medium uppercase tracking-wider">Sensibilidad AI:</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="0.9"
                                                step="0.05"
                                                value={minScore}
                                                onChange={(e) => setMinScore(parseFloat(e.target.value))}
                                                className="w-24 h-1.5 bg-dark-bg rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                            />
                                            <span className="text-brand-primary font-bold w-8">{Math.round(minScore * 100)}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-dark-muted">
                                        <span>Motor:</span>
                                        <span className={clsx("font-bold px-1.5 py-0.5 rounded", searchMetrics.source === 'API' ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400")}>
                                            {searchMetrics.source || 'Standby'}
                                        </span>
                                        {searchMetrics.time !== '0s' && (
                                            <span className="ml-2 font-mono opacity-70">({searchMetrics.time})</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                icon="database"
                                value={results.length}
                                label="Patentes Indexadas"
                                subtext={query ? "Filtradas por similitud" : "Total en base de datos"}
                            />
                            <StatCard
                                icon="check"
                                value={activePatentsCount}
                                label="Patentes Activas"
                                subtext="Tecnologías vigentes"
                                onClick={() => setShowCountryAnalysis(true)}
                            />
                            <StatCard
                                icon="filetext"
                                value="PatentSBERTa_V2"
                                label="Modelo de Inferencia"
                                subtext="Transformer Based"
                            />
                        </div>

                        {/* Semantic Map Placeholder */}
                        <div className="hidden md:block">
                            <SemanticMap patents={results} />
                        </div>

                        {/* Results List */}
                        <div>
                            <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-2">
                                <h3 className="text-xl font-bold text-white">Resultados de Análisis</h3>
                                <span className="text-sm text-dark-muted">Ordenados por relevancia semántica</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {results.map((patent) => (
                                    <PatentCard key={patent.id} patent={patent} score={patent.score} />
                                ))}

                                {results.length === 0 && (
                                    <div className="text-center py-20 bg-dark-card/30 rounded-3xl border border-dashed border-dark-border">
                                        <div className="text-dark-muted mb-4 flex justify-center opacity-50">
                                            <Icon name="search" size={48} />
                                        </div>
                                        <h4 className="text-lg font-medium text-white">No se encontraron patentes</h4>
                                        <p className="text-dark-muted text-sm">Intenta ajustar el filtro de sensibilidad o cambiar los términos.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'database' && (
                    <div className="bg-dark-card rounded-2xl p-1 overflow-hidden border border-dark-border">
                        <DatabaseView patents={results} onImport={() => { }} onClear={() => { }} />
                    </div>
                )}

                {activeView === 'reports' && <ReportsView />}
            </main>
        </div>
    );
}

export default App;
