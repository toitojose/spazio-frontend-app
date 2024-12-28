import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import 'tailwindcss/tailwind.css';

const app = createApp(App);

app.use(router); // Usar el router
app.mount('#app');
