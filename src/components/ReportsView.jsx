import { Icon } from './Icon';
import { getCountryFromId } from '../utils';
import { extractKeywords, findSimilarPairs, generateExecutiveSummary } from '../utils/textAnalysis';

export const ReportsView = ({ selectedPatents, allPatents }) => {
    const selectedData = allPatents.filter(p => selectedPatents.has(p.id));
    const hasSelection = selectedData.length > 0;

    // Quantitative Analysis
    const countryStats = {};
    selectedData.forEach(p => {
        const country = getCountryFromId(p.country || p.id);
        const name = country.name;
        countryStats[name] = (countryStats[name] || 0) + 1;
    });
    const topCountries = Object.entries(countryStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const assigneeStats = {};
    selectedData.forEach(p => {
        const assignee = p.assignee || 'Desconocido';
        assigneeStats[assignee] = (assigneeStats[assignee] || 0) + 1;
    });
    const topAssignees = Object.entries(assigneeStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const yearStats = {};
    selectedData.forEach(p => {
        const year = p.date ? p.date.split('-')[0] : 'Unknown';
        yearStats[year] = (yearStats[year] || 0) + 1;
    });
    const timeline = Object.entries(yearStats)
        .sort((a, b) => a[0].localeCompare(b[0]));

    // Qualitative Analysis
    const keywords = hasSelection ? extractKeywords(selectedData, 12) : [];
    const similarPairs = hasSelection && selectedData.length > 1 ? findSimilarPairs(selectedData, 0.3) : [];
    const summary = hasSelection ? generateExecutiveSummary(selectedData) : null;

    const exportToCSV = () => {
        const headers = ['ID', 'Título', 'País', 'Asignatario', 'Fecha', 'Estado'];
        const rows = selectedData.map(p => [
            p.id,
            `"${p.title.replace(/"/g, '""')}"`,
            getCountryFromId(p.country || p.id).name,
            `"${p.assignee.replace(/"/g, '""')}"`,
            p.date,
            p.status
        ]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `patentes_seleccionadas_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="animate-fade-in p-4 space-y-8">
            {hasSelection && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-primary/20"
                    >
                        <Icon name="download" size={18} />
                        Exportar CSV
                    </button>
                </div>
            )}

            {!hasSelection ? (
                <div className="text-center py-20 bg-dark-card/30 rounded-3xl border border-dashed border-dark-border">
                    <div className="text-dark-muted mb-4 flex justify-center opacity-50">
                        <Icon name="barchart" size={48} />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">No hay patentes seleccionadas</h4>
                    <p className="text-dark-muted text-sm">
                        Marca las casillas en los resultados de búsqueda para generar reportes personalizados
                    </p>
                </div>
            ) : (
                <>
                    {/* Executive Summary */}
                    {summary && (
                        <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-6 rounded-2xl border border-brand-primary/20">
                            <div className="flex items-center gap-2 mb-4 text-white">
                                <Icon name="filetext" size={24} />
                                <h3 className="text-lg font-bold">Resumen Ejecutivo</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="bg-dark-card/50 p-3 rounded-lg">
                                    <div className="text-dark-muted text-xs mb-1">Período</div>
                                    <div className="text-white font-bold">{summary.timeRange}</div>
                                    <div className="text-dark-muted text-xs">{summary.yearsSpan} años</div>
                                </div>
                                <div className="bg-dark-card/50 p-3 rounded-lg">
                                    <div className="text-dark-muted text-xs mb-1">Principal Actor</div>
                                    <div className="text-white font-bold truncate" title={summary.topAssignee}>
                                        {summary.topAssignee}
                                    </div>
                                    <div className="text-dark-muted text-xs">{summary.topAssigneeCount} patentes</div>
                                </div>
                                <div className="bg-dark-card/50 p-3 rounded-lg">
                                    <div className="text-dark-muted text-xs mb-1">Cobertura Geográfica</div>
                                    <div className="text-white font-bold">{summary.countriesCount} países</div>
                                </div>
                                <div className="bg-dark-card/50 p-3 rounded-lg">
                                    <div className="text-dark-muted text-xs mb-1">Actividad Promedio</div>
                                    <div className="text-white font-bold">{summary.avgPatentsPerYear}</div>
                                    <div className="text-dark-muted text-xs">patentes/año</div>
                                </div>
                            </div>
                            {summary.topKeywords.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="text-dark-muted text-xs mb-2">Conceptos Clave:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {summary.topKeywords.map((keyword, i) => (
                                            <span key={i} className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-xs font-medium">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Keywords */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="search" size={24} />
                                <h3 className="text-lg font-bold">Palabras Clave Más Frecuentes</h3>
                            </div>
                            <div className="space-y-2">
                                {keywords.slice(0, 10).map((kw, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-8 text-right text-xs text-dark-muted font-mono">#{i + 1}</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-dark-text font-medium capitalize">{kw.word}</span>
                                                <span className="text-dark-muted">{kw.count} veces</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                                                    style={{ width: `${(kw.count / keywords[0].count) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Classification Analysis (IPCR / CPC) */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="list" size={24} />
                                <h3 className="text-lg font-bold">Clasificación IPCR / CPC</h3>
                            </div>
                            <div className="space-y-4">
                                {selectedData.some(p => p.ipc || p.cpc) ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-dark-muted uppercase tracking-widest mb-3">Principales Códigos IPCR</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(new Set(selectedData.map(p => p.ipc).filter(Boolean))).slice(0, 10).map((code, i) => (
                                                    <span key={i} className="px-2 py-1 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded text-[10px] font-mono">
                                                        {code}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-white/5">
                                            <h4 className="text-xs font-bold text-dark-muted uppercase tracking-widest mb-3">Principales Códigos CPC</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(new Set(selectedData.map(p => p.cpc).filter(Boolean))).slice(0, 10).map((code, i) => (
                                                    <span key={i} className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 rounded text-[10px] font-mono">
                                                        {code}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-black/20 rounded-xl border border-dashed border-dark-border">
                                        <Icon name="info" size={32} className="mx-auto mb-2 text-dark-muted opacity-50" />
                                        <p className="text-xs text-dark-muted px-6">
                                            Los códigos de clasificación IPCR/CPC no están disponibles en el set de datos actual.
                                            <br /><br />
                                            <span className="italic text-[10px]">Asegúrese de que el JSON incluya las claves "IPC" o "CPC".</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Country Distribution */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="globe" size={24} />
                                <h3 className="text-lg font-bold">Distribución por País</h3>
                            </div>
                            <div className="space-y-3">
                                {topCountries.map(([country, count]) => (
                                    <div key={country} className="relative group">
                                        <div className="flex justify-between text-xs mb-1 text-dark-text font-medium z-10 relative">
                                            <span className="truncate pr-2">{country}</span>
                                            <span>{count} ({Math.round((count / selectedData.length) * 100)}%)</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-1000"
                                                style={{ width: `${(count / selectedData.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Assignees */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="users" size={24} />
                                <h3 className="text-lg font-bold">Principales Asignatarios</h3>
                            </div>
                            <div className="space-y-3">
                                {topAssignees.map(([assignee, count]) => (
                                    <div key={assignee} className="relative group">
                                        <div className="flex justify-between text-xs mb-1 text-dark-text font-medium z-10 relative">
                                            <span className="truncate pr-2 w-3/4">{assignee}</span>
                                            <span>{count}</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${(count / selectedData.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border hover:border-brand-primary/30 transition-all lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="calendar" size={24} />
                                <h3 className="text-lg font-bold">Línea de Tiempo de Publicaciones</h3>
                            </div>
                            <div className="flex items-end gap-2 h-40">
                                {timeline.map(([year, count]) => {
                                    const maxCount = Math.max(...timeline.map(t => t[1]));
                                    const height = (count / maxCount) * 100;
                                    return (
                                        <div key={year} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                                                <div
                                                    className="w-full bg-gradient-to-t from-brand-primary to-brand-secondary rounded-t-lg hover:brightness-110 transition-all relative group"
                                                    style={{ height: `${height}%` }}
                                                    title={`${year}: ${count} patente${count !== 1 ? 's' : ''}`}
                                                >
                                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {count}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-dark-muted font-medium">{year}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* High Protection / Claims Content */}
                        <div className="bg-dark-card/50 p-6 rounded-2xl border border-dark-border lg:col-span-2">
                            <div className="flex items-center gap-2 mb-6 text-white">
                                <Icon name="shield" size={24} />
                                <h3 className="text-lg font-bold">Detalle de Alta Protección y Alcance Técnico</h3>
                            </div>
                            <div className="space-y-6">
                                {selectedData.map((p, i) => (
                                    <div key={p.id} className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/20 transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary text-[10px] font-bold rounded uppercase">
                                                    #{i + 1} Patent ID
                                                </span>
                                                <span className="text-white font-bold text-sm">{p.id}</span>
                                            </div>
                                            <span className="text-[10px] text-dark-muted font-mono">{getCountryFromId(p.country || p.id).name}</span>
                                        </div>
                                        <h4 className="text-white font-medium mb-3 text-sm leading-tight">{p.title}</h4>
                                        <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                                            <div className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <Icon name="filetext" size={10} />
                                                Descripción de Reivindicaciones y Protección
                                            </div>
                                            <p className="text-xs text-dark-text leading-relaxed italic">
                                                {p.abstract}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
