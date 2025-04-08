import { defineConfig } from 'vite' // Función para definir la configuración de Vite
import react from '@vitejs/plugin-react' // Plugin oficial de Vite para React

// https://vitejs.dev/config/ - Documentación de configuración de Vite
export default defineConfig({
  // Plugins a utilizar
  plugins: [react()],
  // Configuración del servidor de desarrollo de Vite
  server: {
    // Configuración del proxy
    proxy: {
      // Cualquier petición que empiece con '/api' será redirigida
      '/api': {
        // Destino al que se redirigirán las peticiones: nuestro backend local
        target: 'http://localhost:3001',
        // Necesario para que el backend reciba correctamente la petición (cambia el encabezado Host)
        changeOrigin: true, 
        // No necesitamos reescribir la ruta (ej. quitar /api) porque el backend
        // ya espera las rutas con /api (ej. /api/search)
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
