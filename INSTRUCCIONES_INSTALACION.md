# 🚀 INSTRUCCIONES DE INSTALACIÓN - DATA_PATENTS.AI

## ⚠️ IMPORTANTE: Node.js No Detectado

Para ejecutar esta aplicación Vite + React, necesitas tener Node.js instalado en tu sistema.

## 📥 Paso 1: Instalar Node.js

1. **Descargar Node.js**:
   - Visita: https://nodejs.org/
   - Descarga la versión **LTS (Long Term Support)** recomendada
   - Versión mínima requerida: Node.js 16 o superior

2. **Instalar Node.js**:
   - Ejecuta el instalador descargado
   - Sigue las instrucciones del asistente de instalación
   - **IMPORTANTE**: Marca la opción "Add to PATH" durante la instalación

3. **Verificar la instalación**:
   - Abre una nueva ventana de PowerShell
   - Ejecuta: `node --version`
   - Deberías ver algo como: `v18.17.0` o superior
   - Ejecuta: `npm --version`
   - Deberías ver algo como: `9.6.7` o superior

## 📦 Paso 2: Instalar Dependencias del Proyecto

Una vez que Node.js esté instalado:

```powershell
# Navega al directorio del proyecto
cd "c:\Users\mafab\OneDrive\Documentos\MCD_2026\Gestión_estratégica\APP_ANTIGRAVITY"

# Instala las dependencias
npm install
```

Este comando instalará:
- React 18
- Vite
- Tailwind CSS
- Todas las dependencias necesarias

## 🎯 Paso 3: Ejecutar la Aplicación

```powershell
# Inicia el servidor de desarrollo
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en: `http://localhost:5173`

## 🔑 Paso 4: Configurar Token de Hugging Face

1. Al abrir la aplicación por primera vez, verás un modal solicitando tu token
2. Si no tienes un token:
   - Visita: https://huggingface.co/settings/tokens
   - Crea una cuenta gratuita si no tienes una
   - Genera un nuevo token de lectura (Read token)
3. Copia el token y pégalo en el modal de la aplicación
4. El token se guardará localmente en tu navegador

## ✅ Verificación

Una vez que la aplicación esté ejecutándose:

- ✓ Deberías ver la interfaz de DATA_PATENTS.AI
- ✓ El sidebar izquierdo con navegación
- ✓ La barra de búsqueda central
- ✓ Las tarjetas de patentes
- ✓ El mapa de clusters semánticos

## 🔧 Comandos Útiles

```powershell
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Detener el servidor
# Presiona Ctrl + C en la terminal
```

## 🆘 Solución de Problemas

### Error: "npm no se reconoce"
- Node.js no está instalado o no está en el PATH
- Reinstala Node.js y asegúrate de marcar "Add to PATH"
- Reinicia PowerShell después de instalar

### Error: "Cannot find module"
- Ejecuta: `npm install` nuevamente
- Elimina la carpeta `node_modules` y ejecuta `npm install`

### Puerto 5173 ya en uso
- Cierra otras instancias de Vite
- O cambia el puerto en `vite.config.js`

### Error de CORS con Hugging Face
- Asegúrate de que el servidor de desarrollo esté ejecutándose
- Verifica que tu token sea válido
- La aplicación funcionará en modo offline si la API no está disponible

## 📞 Contacto

Si tienes problemas con la instalación, verifica:
1. Node.js versión 16 o superior instalado
2. npm funcionando correctamente
3. Conexión a internet para descargar dependencias

---

**Nota**: La versión HTML anterior (que no requiere Node.js) está disponible en `backup_html_version/index.html`, pero tiene limitaciones de CORS que esta versión Vite resuelve.
