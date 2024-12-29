import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'tailwindcss/tailwind.css';
import 'public/spazio.css';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import { i18n } from '@/locales/i18n';

const app = createApp(App);
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
