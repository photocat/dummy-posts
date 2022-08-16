import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: 'https://photocat.github.io/dummy-posts',
    plugins: [react()],
    css: {
        devSourcemap: true
    },
})
