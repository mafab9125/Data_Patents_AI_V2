import anexoData from './anexo.json';

/**
 * Mapeo de datos desde ANEXO.JSON
 * Se transforma la estructura original (Español/Keys complejas)
 * a la estructura simplificada que usa la App.
 */
export const INITIAL_PATENTS = anexoData.map(p => {
    // Generar fecha legible desde timestamp
    let dateStr = new Date().toISOString().split('T')[0];
    if (p["Fecha de publicación"]) {
        try {
            dateStr = new Date(p["Fecha de publicación"]).toISOString().split('T')[0];
        } catch (e) { console.warn("Fecha inválida", p); }
    }

    // Limpiar ID (quitar espacios para consistencia)
    const cleanId = p["Mostrar clave"] ? p["Mostrar clave"].replace(/\s+/g, '') : `UNKNOWN-${p["#"]}`;

    return {
        id: cleanId,
        title: p["Título"] || "Sin Título",
        abstract: p["Resumen"] || "No abstract available.",
        assignee: p["Solicitantes"] || "Unknown Assignee",
        date: dateStr,
        country: p["CODE"] || "UN", // Default to UN if missing
        status: "Activo", // Default value
        score: 0,
        url: p["URL_ESPACENET"] || p["URL_LENS"] || null,
        ipc: p["IPC"] || p["IPCR"] || null,
        cpc: p["CPC"] || null,
        // Generar tags simples basados en título/abstract para ayudar al mapa (opcional)
        tags: []
    };
});
