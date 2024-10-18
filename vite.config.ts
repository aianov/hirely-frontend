import react from "@vitejs/plugin-react"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
// Получаем путь к директории
const __dirname = dirname(__filename)

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  devOptions: {
    enabled: true
  },
  manifest: {
    name: "NicsBar",
    short_name: "NicsBar",
    description: `Social network "NicsBar"!`,
    theme_color: "#0e0e0e",
    background_color: "#0e0e0e",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [{
      src: 'assets/images/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: 'assets/images/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }]
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePWA
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@layouts": "/src/layouts",
      "@assets": "/src/assets",
      "@stores": "/src/stores",
      "@styles": "/src/assets/styles",
      "@features": "/src/features",
      "@icons": "/src/assets/icons",
      "@images": path.resolve(__dirname, 'src/assets/images'),
      "@shared": "/src/shared",
      "@hooks": "/src/shared/hooks"
    },
  },
  server: {
    proxy: {
      '/api': 'http://192.168.31.208:5151',
    },
  },
})
