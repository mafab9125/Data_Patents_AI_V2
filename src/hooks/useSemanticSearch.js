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
            let source = 'API';

            // 1. Obtener Embedding del Query
            if (queryCache[query]) {
                queryEmbedding = queryCache[query];
                source = 'Cache';
            } else {
                if (!token) throw new Error("Token no configurado");
                queryEmbedding = await getEmbeddings(query, token);
                setQueryCache(prev => ({ ...prev, [query]: queryEmbedding }));
            }

            // 2. Calcular Similitud con Patentes
            // NOTA: Idealmente las patentes ya deberían tener embeddings pre-calculados.
            // Si no los tienen, en un escenario real esto fallaría o requeriría calcularlos al vuelo (lento y costoso).
            // Para este prototipo, asumiremos que si NO tienen embedding, simulamos un score basado en texto 
            // O generamos uno dummy si es demo.

            const scoredResults = initialPatents.map(patent => {
                let score = 0;

                if (patent.embedding) {
                    // Comparación Vectorial Real
                    score = cosineSimilarity(queryEmbedding, patent.embedding);
                } else {
                    // Fallback: Si la patente no tiene embedding (caso inicial),
                    // usamos una heurística de texto simple temporalmente
                    // OJO: En la fase de data, actualizaremos esto.
                    const text = `${patent.title} ${patent.abstract} ${patent.claims}`.toLowerCase();
                    const q = query.toLowerCase();
                    if (text.includes(q)) score = 0.5;
                    // Boost por palabras clave
                    const words = q.split(' ');
                    const matchCount = words.filter(w => text.includes(w)).length;
                    score += (matchCount / words.length) * 0.4;
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
            const textResults = initialPatents.filter(p =>
                (p.title + p.abstract).toLowerCase().includes(query.toLowerCase())
            ).map(p => ({ ...p, score: 0.1 })); // Score bajo indicando keyword match

            setResults(textResults);
            setSearchMetrics({ time: '0s', source: 'Offline Fallback' });
        } finally {
            setIsSearching(false);
        }
    }, [initialPatents, queryCache]);

    const resetSearch = () => {
        setResults(initialPatents);
        setError(null);
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
