import { useState, useCallback } from 'react';
import { getEmbeddings } from '../services/huggingFace';
import { cosineSimilarity } from '../utils/math';

/**
 * Hook para manejar la búsqueda semántica
 * @param {Array} initialPatents - Base de datos inicial de patentes
 */
export const useSemanticSearch = (initialPatents = []) => {
    const [results, setResults] = useState(initialPatents);
    const [isSearching, setIsSearching] = useState(false);
    const [searchMetrics, setSearchMetrics] = useState({ time: '0s', source: 'Local' });
    const [error, setError] = useState(null);

    // Cache simple para evitar llamadas repetidas a la API con el mismo query
    const [queryCache, setQueryCache] = useState({});

    /**
     * Ejecuta una búsqueda semántica
     * @param {string} query - Texto a buscar
     * @param {string} token - Token de HF
     * @param {number} minScore - Score mínimo para filtrar (0-1)
     */
    const search = useCallback(async (query, token, minScore = 0.0) => {
        if (!query.trim()) {
            setResults(initialPatents);
            return;
        }

        setIsSearching(true);
        setError(null);
        const startTime = performance.now();

        try {
            let queryEmbedding;
            let source = 'API (PatentSBERTa)';

            // 1. Obtener Embedding del Query
            if (queryCache[query]) {
                queryEmbedding = queryCache[query];
                source = 'Cache';
            } else {
                if (!token) throw new Error("Token no configurado. Por favor ingresa tu token de Hugging Face.");
                queryEmbedding = await getEmbeddings(query, token);
                setQueryCache(prev => ({ ...prev, [query]: queryEmbedding }));
            }

            // 2. Calcular Similitud con Patentes
            const scoredResults = initialPatents.map(patent => {
                let score = 0;

                if (patent.embedding && Array.isArray(patent.embedding)) {
                    // Comparación Vectorial Real
                    score = cosineSimilarity(queryEmbedding, patent.embedding);
                } else {
                    // Fallback: Si la patente no tiene embedding en el dataset
                    // Usamos Keyword Matching mejorado como fallback temporal
                    const text = `${patent.title} ${patent.abstract} ${patent.claims || ''}`.toLowerCase();
                    const q = query.toLowerCase();

                    if (text.includes(q)) score = 0.5; // Base score por match exacto

                    const words = q.split(' ').filter(w => w.length > 3);
                    if (words.length > 0) {
                        const matchCount = words.filter(w => text.includes(w)).length;
                        score += (matchCount / words.length) * 0.4;
                    }
                }

                return { ...patent, score };
            });

            // 3. Ordenar y Filtrar
            const filtered = scoredResults
                .sort((a, b) => b.score - a.score)
                .filter(p => p.score >= minScore);

            const endTime = performance.now();
            setSearchMetrics({
                time: ((endTime - startTime) / 1000).toFixed(2) + 's',
                source: source
            });
            setResults(filtered);

        } catch (err) {
            console.error("Search error:", err);
            setError(err.message);

            // Fallback a búsqueda simple si falla la API
            // Mantenemos al usuario informado de que es un fallback
            const textResults = initialPatents.map(p => {
                const text = (p.title + p.abstract).toLowerCase();
                const q = query.toLowerCase();
                let score = 0;
                if (text.includes(q)) score = 0.3;
                return { ...p, score };
            })
                .sort((a, b) => b.score - a.score)
                .filter(p => p.score > 0);

            setResults(textResults);
            setSearchMetrics({ time: '0s', source: 'ERROR - Usando Fallback Local' });
        } finally {
            setIsSearching(false);
        }
    }, [initialPatents, queryCache]);

    const resetSearch = () => {
        setResults(initialPatents);
        setError(null);
        setSearchMetrics({ time: '0s', source: 'Local' });
    };

    return {
        results,
        isSearching,
        searchMetrics,
        error,
        search,
        resetSearch
    };
};
