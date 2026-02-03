// Script para corregir URLs de Google Patents
// Este script convierte IDs de patentes al formato correcto de URL

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'patents.js');

// Leer el archivo
let content = fs.readFileSync(filePath, 'utf8');

// Función para convertir ID a URL correcta
function patentIdToUrl(id) {
    // Remover guiones y espacios
    const cleanId = id.replace(/[-\s]/g, '');

    // Patentes US: US-2023001-A1 → US20230001A1 (agregar 0 antes del número)
    if (cleanId.startsWith('US')) {
        const match = cleanId.match(/US(\d+)([A-Z]\d*)/);
        if (match) {
            const number = match[1].padStart(8, '0'); // Asegurar 8 dígitos
            const suffix = match[2];
            return `https://patents.google.com/patent/US${number}${suffix}`;
        }
    }

    // Otras patentes: simplemente remover guiones
    return `https://patents.google.com/patent/${cleanId}`;
}

// Encontrar y reemplazar todas las URLs
const regex = /"id":\s*"([^"]+)"[\s\S]*?"url":\s*"https:\/\/patents\.google\.com\/patent\/([^"]+)"/g;

let matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
    matches.push({
        id: match[1],
        currentUrl: match[2],
        correctUrl: patentIdToUrl(match[1]).replace('https://patents.google.com/patent/', '')
    });
}

console.log('\n📊 Análisis de URLs:\n');
matches.forEach(m => {
    if (m.currentUrl !== m.correctUrl) {
        console.log(`❌ ${m.id}`);
        console.log(`   Actual:  ${m.currentUrl}`);
        console.log(`   Correcto: ${m.correctUrl}\n`);
    } else {
        console.log(`✅ ${m.id} - OK`);
    }
});

// Aplicar correcciones
matches.forEach(m => {
    if (m.currentUrl !== m.correctUrl) {
        const oldPattern = `"url": "https://patents.google.com/patent/${m.currentUrl}"`;
        const newPattern = `"url": "https://patents.google.com/patent/${m.correctUrl}"`;
        content = content.replace(oldPattern, newPattern);
    }
});

// Guardar archivo corregido
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✅ Archivo actualizado correctamente!\n');
