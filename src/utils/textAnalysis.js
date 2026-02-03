// Text analysis utilities for patent reports

const STOPWORDS_ES = new Set([
    'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'haber', 'por', 'con', 'su', 'para',
    'como', 'estar', 'tener', 'le', 'lo', 'todo', 'pero', 'más', 'hacer', 'o', 'poder', 'decir', 'este',
    'ir', 'otro', 'ese', 'la', 'si', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando', 'él', 'muy', 'sin',
    'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno', 'mismo', 'yo', 'también', 'hasta', 'año',
    'dos', 'querer', 'entre', 'así', 'primero', 'desde', 'grande', 'eso', 'ni', 'nos', 'llegar', 'pasar',
    'tiempo', 'ella', 'sí', 'día', 'uno', 'bien', 'poco', 'deber', 'entonces', 'poner', 'cosa', 'tanto',
    'hombre', 'parecer', 'nuestro', 'tan', 'donde', 'ahora', 'parte', 'después', 'vida', 'quedar', 'siempre',
    'creer', 'hablar', 'llevar', 'dejar', 'nada', 'cada', 'seguir', 'menos', 'nuevo', 'encontrar', 'algo',
    'solo', 'decir', 'puede', 'mediante', 'usa', 'usando', 'utiliza', 'utilizando', 'comprende', 'incluye'
]);

const STOPWORDS_EN = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if',
    'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
    'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
    'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two',
    'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give',
    'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'having', 'may',
    'such', 'being', 'through', 'where', 'much', 'should', 'well', 'method', 'apparatus', 'system', 'device',
    'comprising', 'includes', 'using', 'wherein', 'thereof', 'configured', 'adapted', 'provided'
]);

const STOPWORDS = new Set([...STOPWORDS_ES, ...STOPWORDS_EN]);

/**
 * Extract keywords from patent titles and abstracts
 * @param {Array} patents - Array of patent objects
 * @param {number} topN - Number of top keywords to return
 * @returns {Array} Array of {word, count} objects
 */
export const extractKeywords = (patents, topN = 15) => {
    const wordCounts = {};

    patents.forEach(patent => {
        const text = `${patent.title} ${patent.abstract}`.toLowerCase();
        // Remove special characters and split into words
        const words = text
            .replace(/[^a-záéíóúñü\s]/gi, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3 && !STOPWORDS.has(word));

        words.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
    });

    return Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([word, count]) => ({ word, count }));
};

/**
 * Calculate cosine similarity between two vectors
 */
const cosineSimilarity = (vecA, vecB) => {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

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
 * Find pairs of similar patents
 * @param {Array} patents - Array of patent objects with embeddings
 * @param {number} threshold - Minimum similarity threshold (0-1)
 * @returns {Array} Array of {patent1, patent2, similarity} objects
 */
export const findSimilarPairs = (patents, threshold = 0.7) => {
    const pairs = [];

    for (let i = 0; i < patents.length; i++) {
        for (let j = i + 1; j < patents.length; j++) {
            // Use simple text similarity if embeddings not available
            const similarity = calculateTextSimilarity(patents[i], patents[j]);

            if (similarity >= threshold) {
                pairs.push({
                    patent1: patents[i],
                    patent2: patents[j],
                    similarity: similarity
                });
            }
        }
    }

    return pairs.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
};

/**
 * Calculate simple text-based similarity between two patents
 */
const calculateTextSimilarity = (patent1, patent2) => {
    const text1 = `${patent1.title} ${patent1.abstract}`.toLowerCase();
    const text2 = `${patent2.title} ${patent2.abstract}`.toLowerCase();

    const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 3 && !STOPWORDS.has(w)));
    const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 3 && !STOPWORDS.has(w)));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size; // Jaccard similarity
};

/**
 * Generate executive summary insights
 * @param {Array} patents - Array of selected patents
 * @returns {Object} Summary insights
 */
export const generateExecutiveSummary = (patents) => {
    if (patents.length === 0) return null;

    // Time range
    const years = patents.map(p => p.date ? parseInt(p.date.split('-')[0]) : 0).filter(y => y > 0);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    // Top assignees
    const assignees = {};
    patents.forEach(p => {
        const assignee = p.assignee || 'Desconocido';
        assignees[assignee] = (assignees[assignee] || 0) + 1;
    });
    const topAssignee = Object.entries(assignees).sort((a, b) => b[1] - a[1])[0];

    // Countries
    const countries = new Set(patents.map(p => p.country || 'UN'));

    // Keywords
    const keywords = extractKeywords(patents, 5);

    return {
        totalPatents: patents.length,
        timeRange: `${minYear}-${maxYear}`,
        yearsSpan: maxYear - minYear + 1,
        topAssignee: topAssignee ? topAssignee[0] : 'N/A',
        topAssigneeCount: topAssignee ? topAssignee[1] : 0,
        countriesCount: countries.size,
        topKeywords: keywords.map(k => k.word),
        avgPatentsPerYear: (patents.length / (maxYear - minYear + 1)).toFixed(1)
    };
};
