import { createApp, ref } from 'vue';
import { i18n } from '@/locales/i18n';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { spazioThemePreset } from '@/assets/theme/spazio-theme-preset.ts';
import 'tailwindcss/tailwind.css';
import 'primeicons/primeicons.css';
import 'public/spazio.css';
const isDarkMode = false;

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
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

const showLoginDialog = ref(false);

// Proveer globalmente la función
app.provide('openLoginDialog', () => {
  showLoginDialog.value = true;
});

app.mount('#app');
