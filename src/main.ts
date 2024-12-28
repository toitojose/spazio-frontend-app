import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'tailwindcss/tailwind.css';
import 'public/spazio.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import messages from '@/locales';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'pv',
      darkModeSelector: 'system',
      cssLayer: false, // Desactiva la capa CSS si no es necesaria
    },
  },
});

app.mount('#app');
