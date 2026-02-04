import { useRef } from 'react';

export const DatabaseView = ({ patents, onImport, onClear, onVectorize, isHydrating }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                if (Array.isArray(jsonData)) {
                    onImport(jsonData);
                } else {
                    alert("El formato del JSON es incorrecto. Debe ser una lista de patentes.");
                }
            } catch (err) {
                console.error(err);
                alert("Error al leer el archivo JSON.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="animate-fade-in p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Inventario de Patentes</h2>
                <div className="flex gap-2">
                    <button
                        onClick={onVectorize}
                        disabled={isHydrating}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors font-semibold text-sm disabled:opacity-50"
                    >
                        {isHydrating ? (
                            <>
                                <div className="w-3 h-3 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
                                Vectorizando...
                            </>
                        ) : (
                            'Vectorizar DB'
                        )}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".json"
                        className="hidden"
                    />
                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors font-semibold text-sm"
                    >
                        Borrar Todo
                    </button>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors font-semibold text-sm"
                    >
                        Importar JSON
                    </button>
                    <div className="bg-brand-primary/20 text-brand-primary px-3 py-2 rounded-lg text-xs font-mono border border-brand-primary/20">
                        {patents.length} registros
                    </div>
                </div>
            </div>

            <div className="bg-dark-bg/50 rounded-xl shadow-inner border border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-dark-muted">
                        <thead className="bg-white/5 text-white font-semibold border-b border-white/10">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Título</th>
                                <th className="p-4">Asignado a</th>
                                <th className="p-4">Tags</th>
                                <th className="p-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {patents.map(p => (
                                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-xs text-brand-accent">{p.id}</td>
                                    <td className="p-4 font-medium text-white">{p.title}</td>
                                    <td className="p-4 text-xs">{p.assignee}</td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap">
                                            {p.tags?.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${p.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            p.status === 'Pendiente' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
