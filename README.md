# DATA_PATENTS.AI

Aplicación de búsqueda semántica de patentes con IA, desarrollada con React + Vite.

## 🚀 Características

- **Búsqueda Semántica**: Utiliza el modelo PatentSBERTa_V2 de Hugging Face para búsquedas inteligentes
- **Visualización de Clusters**: Mapa interactivo que muestra la similitud entre patentes
- **Base de Datos**: Vista de tabla completa de todas las patentes
- **Generación de Reportes**: Exportación de análisis en formato de texto
- **Interfaz Moderna**: Diseño premium con Tailwind CSS y animaciones suaves

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Token de API de Hugging Face (obtener en https://huggingface.co/settings/tokens)

## 🛠️ Instalación

1. **Instalar dependencias**:
```bash
npm install
```

2. **Iniciar servidor de desarrollo**:
```bash
npm run dev
```

3. **Abrir en el navegador**:
La aplicación se abrirá automáticamente en `http://localhost:5173`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 🔑 Configuración del Token

Al iniciar la aplicación por primera vez, se te pedirá que ingreses tu token de API de Hugging Face. Este token se guardará localmente en el navegador y se utilizará para realizar búsquedas semánticas.

## 📁 Estructura del Proyecto

```
APP_ANTIGRAVITY/
├── src/
│   ├── components/
│   │   ├── Icon.jsx
│   │   ├── Sidebar.jsx
│   │   ├── PatentCard.jsx
│   │   ├── SemanticMap.jsx
│   │   ├── StatCard.jsx
│   │   ├── TokenModal.jsx
│   │   ├── DatabaseView.jsx
│   │   └── ReportsView.jsx
│   ├── data/
│   │   └── patents.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backup_html_version/
│   └── index.html (versión anterior)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Tecnologías Utilizadas

- **React 18**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de estilos
- **Hugging Face API**: Modelo de embeddings PatentSBERTa_V2

## 🔧 Solución de Problemas

### Error de CORS
Si experimentas errores de CORS, asegúrate de que el servidor de desarrollo esté ejecutándose (`npm run dev`). La migración a Vite resuelve los problemas de CORS que ocurrían al abrir el archivo HTML directamente.

### Token Inválido
Si recibes errores de autenticación, verifica que tu token de Hugging Face sea válido y tenga permisos de lectura.

## 📝 Notas

- La versión HTML anterior se encuentra respaldada en `backup_html_version/`
- La aplicación funciona en modo offline con búsqueda basada en texto si la API de Hugging Face no está disponible
- Los datos de patentes están en español para facilitar las búsquedas en ese idioma

## 🌟 Próximas Mejoras

- Agregar más patentes a la base de datos
- Implementar enlaces a fuentes externas de patentes
- Mejorar el generador de reportes con exportación PDF real
- Añadir filtros avanzados de búsqueda
