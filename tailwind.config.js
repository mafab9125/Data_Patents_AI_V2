/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#1a1a1a',    // Fondo principal
                    card: '#2a2a2a',  // Cartas y contenedores
                    border: '#333333', // Bordes sutiles
                    text: '#e2e8f0',   // Texto principal
                    muted: '#94a3b8'   // Texto secundario
                },
                brand: {
                    primary: '#3b82f6', // Azul eléctrico
                    secondary: '#8b5cf6', // Morado neón
                    accent: '#06b6d4',  // Cyan para detalles
                    success: '#10b981',
                    warning: '#f59e0b',
                    danger: '#ef4444'
                }
            },
            fontFamily: {
                sans: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
