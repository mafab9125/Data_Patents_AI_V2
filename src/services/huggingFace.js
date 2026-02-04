/**
 * Servicio para interactuar con la API de Hugging Face
 * Con Fallback a Modo Demo Local
 */
import { generateLocalEmbedding } from './localEmbeddings';

const MODEL_ID = "intfloat/multilingual-e5-small";
const USE_DEMO_MODE = true; // Cambia a false cuando la API funcione

console.log(USE_DEMO_MODE ? "🎭 Demo Mode Enabled (Local Embeddings)" : "🚀 HuggingFace API Mode");

/**
 * Genera embeddings para un texto dado usando PatentSBERTa_V2
 * @param {string} text - El texto o consulta a procesar
 * @param {string} token - El token de acceso de Hugging Face
 * @returns {Promise<number[]>} - El vector de embeddings
 */
export const getEmbeddings = async (text, token) => {
    if (!text) {
        throw new Error("Texto es requerido para generar embeddings.");
    }

    // MODO DEMO: Genera embeddings localmente sin API
    if (USE_DEMO_MODE) {
        console.log("🎭 Generating local embedding for:", text.substring(0, 50) + "...");
        // Simulamos un pequeño delay para que parezca real
        await new Promise(resolve => setTimeout(resolve, 100));
        return generateLocalEmbedding(text);
    }

    // MODO API: Usa Hugging Face Router
    if (!token) {
        throw new Error("Token es requerido para el modo API.");
    }

    try {
        // Usamos el proxy configurado en Vite para evitar CORS
        const response = await fetch(`/api/hf/models/${MODEL_ID}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: [text],  // Envolvemos en array para forzar Feature Extraction (evita error 'missing sentences')
                options: { wait_for_model: true }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMsg = response.statusText;
            try {
                const errorData = JSON.parse(errorText);
                errorMsg = errorData.error || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                errorMsg = errorText || errorMsg;
            }

            if (response.status === 503) {
                throw new Error("El modelo se está cargando (Cold Start)... intenta en 20s.");
            }
            throw new Error(`Error API (${response.status}): ${errorMsg}`);
        }

        const result = await response.json();

        // Estructura de respuesta OpenAI: { data: [{ embedding: [...] }] }
        if (result && result.data && result.data[0] && result.data[0].embedding) {
            return result.data[0].embedding;
        }

        // Estructura alternativa (algunos modelos en router): [0.1, 0.2...]
        if (Array.isArray(result) && typeof result[0] === 'number') {
            return result;
        }

        console.error("Respuesta inesperada:", result);
        throw new Error("Formato de respuesta inesperado (OpenAI Compat).");

    } catch (error) {
        console.error("Error en getEmbeddings:", error);
        // Log extra details for debugging
        if (error.message.includes('401')) {
            console.error("Error 401: Token inválido o permisos insuficientes.");
        }
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
        await getEmbeddings("test", token);
        return { valid: true };
    } catch (error) {
        console.warn("Token validation failed:", error.message);
        return { valid: false, error: error.message };
    }
};
