import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from '@/router/public/auth-routes.ts';

// Rutas públicas
const publicRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/ui/views/public/Home.vue'),
  },
];

const routes = [...publicRoutes, ...AuthRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
