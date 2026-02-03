// Mapa de códigos de país a datos (nombre, bandera)
const COUNTRY_MAP = {
    'US': { name: 'Estados Unidos', flag: '🇺🇸' },
    'EP': { name: 'Europa (EPO)', flag: '🇪🇺' },
    'WO': { name: 'WIPO (Intl)', flag: '🌐' },
    'CN': { name: 'China', flag: '🇨🇳' },
    'JP': { name: 'Japón', flag: '🇯🇵' },
    'KR': { name: 'Corea del Sur', flag: '🇰🇷' },
    'DE': { name: 'Alemania', flag: '🇩🇪' },
    'GB': { name: 'Reino Unido', flag: '🇬🇧' },
    'FR': { name: 'Francia', flag: '🇫🇷' },
    'CA': { name: 'Canadá', flag: '🇨🇦' },
    'AU': { name: 'Australia', flag: '🇦🇺' },
    'ES': { name: 'España', flag: '🇪🇸' },
    'MX': { name: 'México', flag: '🇲🇽' },
    'BR': { name: 'Brasil', flag: '🇧🇷' },
    'IN': { name: 'India', flag: '🇮🇳' },
    'RU': { name: 'Rusia', flag: '🇷🇺' },
    'TW': { name: 'Taiwán', flag: '🇹🇼' },
};

/**
 * Obtiene el país y bandera basado en el ID de la patente
 * @param {string} patentId - ID de la patente (ej: US123456)
 * @returns {object} - { code, name, flag }
 */
export const getCountryFromId = (patentId) => {
    if (!patentId) return { code: '??', name: 'Desconocido', flag: '🏳️' };

    // Extraer prefijo de país (primeras 2 letras)
    const code = patentId.match(/^[A-Z]{2}/)?.[0] || '??';

    // Buscar en mapa o retornar genérico
    const country = COUNTRY_MAP[code] || { name: 'Internacional', flag: '🏳️' };

    return {
        code,
        name: country.name,
        flag: country.flag
    };
};

/**
 * Genera estadísticas de países para un array de patentes
 * @param {Array} patents - Lista de patentes
 * @returns {Array} - Lista ordenada de { country, count, percentage, flag }
 */
export const getCountryStats = (patents) => {
    const stats = {};
    const total = patents.length;

    patents.forEach(p => {
        const { name, flag } = getCountryFromId(p.id);
        if (!stats[name]) {
            stats[name] = { name, flag, count: 0 };
        }
        stats[name].count++;
    });

    return Object.values(stats)
        .map(s => ({
            ...s,
            percentage: ((s.count / total) * 100).toFixed(1)
        }))
        .sort((a, b) => b.count - a.count);
};
