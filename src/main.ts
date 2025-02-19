import { createApp, ref } from 'vue';
import { i18n } from '@/locales/i18n';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { spazioThemePreset } from '@/assets/theme/spazio-theme-preset.ts';
import 'tailwindcss/tailwind.css';
import 'primeicons/primeicons.css';
import 'public/spazio.css';
const isDarkMode = false;

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);
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
app.use(ToastService);

const showLoginDialog = ref(false);

// Proveer globalmente la función
app.provide('openLoginDialog', () => {
  showLoginDialog.value = true;
});

app.mount('#app');
