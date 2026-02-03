/**
 * Librería de utilidades matemáticas para búsqueda vectorial
 */

/**
 * Calcula la similitud coseno entre dos vectores
 * Fórmula: (A . B) / (||A|| * ||B||)
 * @param {number[]} vecA - Vector A
 * @param {number[]} vecB - Vector B
 * @returns {number} - Similitud entre -1 y 1 (usualmente 0 a 1 para embeddings positivos)
 */
export const cosineSimilarity = (vecA, vecB) => {
    if (!vecA || !vecB || vecA.length !== vecB.length) {
        // console.warn("Vectores incompatibles o nulos", vecA?.length, vecB?.length);
        return 0; // Retorno seguro
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Normaliza un vector para que su magnitud sea 1 (útil si se van a hacer muchas comparaciones)
 * @param {number[]} vec 
 * @returns {number[]}
 */
export const normalizeVector = (vec) => {
    let norm = 0;
    for (let i = 0; i < vec.length; i++) {
        norm += vec[i] * vec[i];
    }
    norm = Math.sqrt(norm);
    if (norm === 0) return vec;
    return vec.map(v => v / norm);
};
