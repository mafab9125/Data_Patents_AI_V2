/**
 * Generador de Embeddings Locales (Modo Demo)
 * Crea vectores determinísticos basados en el texto sin llamar a APIs externas
 */

/**
 * Genera un embedding "simulado" pero consistente basado en el texto
 * @param {string} text - Texto a vectorizar
 * @returns {number[]} - Vector de 384 dimensiones
 */
export const generateLocalEmbedding = (text) => {
    const VECTOR_SIZE = 384; // Tamaño estándar de embeddings pequeños
    const vector = new Array(VECTOR_SIZE).fill(0);

    // Normalizamos el texto
    const normalized = text.toLowerCase().trim();

    // Generamos un hash simple pero determinístico
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    // Usamos el hash como semilla para generar valores consistentes
    const seed = Math.abs(hash);

    // Generador pseudo-aleatorio determinístico (basado en semilla)
    const random = (index) => {
        const x = Math.sin(seed + index) * 10000;
        return x - Math.floor(x);
    };

    // Llenamos el vector con valores basados en características del texto
    for (let i = 0; i < VECTOR_SIZE; i++) {
        // Combinamos múltiples factores para crear un vector "rico"
        const charInfluence = normalized.charCodeAt(i % normalized.length) / 255;
        const lengthInfluence = (normalized.length % 100) / 100;
        const positionInfluence = i / VECTOR_SIZE;
        const randomInfluence = random(i);

        vector[i] = (charInfluence * 0.3 + lengthInfluence * 0.2 + positionInfluence * 0.2 + randomInfluence * 0.3) - 0.5;
    }

    // Normalizamos el vector (magnitud = 1)
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(val => val / magnitude);
};

console.log("✅ Local Embeddings Module Loaded (Demo Mode)");
