import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'tailwindcss/tailwind.css';
import 'public/spazio.css';
import 'primeicons/primeicons.css';
import messages from '@/locales';
import { createI18n } from 'vue-i18n';
import Aura from '@primevue/themes/aura';
import { createHead } from '@vueuse/head';

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages,
});
const headHtml = createHead();

const app = createApp(App);
app.use(headHtml);
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      cssLayer: false,
      darkModeSelector: 'none',
    },
  },
});

app.mount('#app');
