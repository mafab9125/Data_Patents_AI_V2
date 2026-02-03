/**
 * Servicio para interactuar con la API de Hugging Face
 * Modelo: AAUBS/PatentSBERTa_V2
 */

const MODEL_ID = "BAAI/bge-small-en-v1.5";

// Determinamos si estamos en desarrollo o producción
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// En local usamos el proxy, en producción (Vercel) llamamos directo a HF
const API_URL = isDev
    ? `/api/hf/hf-inference/models/${MODEL_ID}`
    : `https://api-inference.huggingface.co/models/${MODEL_ID}`;

/**
 * Genera embeddings para un texto dado usando PatentSBERTa_V2
 * @param {string} text - El texto o consulta a procesar
 * @param {string} token - El token de acceso de Hugging Face
 * @returns {Promise<number[]>} - El vector de embeddings
 */
export const getEmbeddings = async (text, token) => {
    if (!text || !token) {
        throw new Error("Texto y token son requeridos para generar embeddings.");
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: [text],
                options: { wait_for_model: true }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            // Manejo específico para modelo cargando (503)
            if (response.status === 503) {
                throw new Error("El modelo se está cargando (Cold Start). Por favor intenta de nuevo en unos segundos.");
            }
            throw new Error(`Error API (${response.status}): ${errorData.error || response.statusText}`);
        }

        const result = await response.json();

        // La API puede devolver diferentes estructuras dependiendo del input
        // Para feature-extraction suele ser un array de números (vector) o un array de arrays (lotes)
        if (Array.isArray(result)) {
            // Si es un array de arrays (batch), tomamos el primero si solo enviamos un texto
            if (Array.isArray(result[0])) {
                return result[0];
            }
            return result;
        }

        throw new Error("Formato de respuesta inesperado de la API.");

    } catch (error) {
        console.error("Error en getEmbeddings:", error);
        throw error;
    }
};

/**
 * Validez del token haciendo una llamada ligera
 * @param {string} token 
 * @returns {Promise<boolean>}
 */
export const validateToken = async (token) => {
    try {
        // Intentamos una llamada dummy muy corta
        await getEmbeddings("test", token);
        return { valid: true };
    } catch (error) {
        console.warn("Token validation failed:", error.message);
        return { valid: false, error: error.message };
    }
};
