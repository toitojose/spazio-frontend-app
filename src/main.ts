import { createApp } from 'vue';
import { i18n } from '@/locales/i18n';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { spazioThemePreset } from '@/assets/theme/spazio-theme-preset.ts';
import 'tailwindcss/tailwind.css';
import 'primeicons/primeicons.css';
import 'public/spazio.css';
const isDarkMode = true;

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(i18n);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: spazioThemePreset,
    options: {
      prefix: 'sz',
      darkModeSelector: isDarkMode ? '.dark' : 'none',
    },
  },
});

app.mount('#app');
