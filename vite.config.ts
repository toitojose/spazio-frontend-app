import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const editor = env.VITE_EDITOR || 'code';

  return {
    plugins: [
        vue(),
      tsconfigPaths({ projects: ['./tsconfig.app.json'] }),
      mode === 'dev' ? vueDevTools({ launchEditor: editor }) : null].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      'import.meta.vitest': mode === 'production' ? 'undefined' : 'import.meta.vitest',
    },
    css: {
      // Configuración futura de preprocesadores o estilos globales
    },
    build: {
      minify: 'terser', // Minimiza el código para producción
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'], // Divide dependencias en un chunk separado
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      includeSource: ['src/**/*.{js,ts}'],
    },
  };
});
