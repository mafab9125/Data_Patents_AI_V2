import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        open: true,
        proxy: {
            '/api/hf-proxy': {
                target: 'https://router.huggingface.co/hf-inference/models/BAAI/bge-small-en-v1.5',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/hf-proxy/, ''),
                secure: false
            }
        }
    }
})
