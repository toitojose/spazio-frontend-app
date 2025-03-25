import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from '@/router/public/auth-routes';
import BackofficeRoutes from '@/router/private/backoffice-routes.ts';
import { i18n } from '@/locales/i18n';
import PublicRoutes from '@/router/public/public-routes.ts';
import RenterRoutes from '@/router/private/renter-routes.ts';
import AgentRoutes from '@/router/private/agent-routes.ts';
import PropertyOwnerRoutes from '@/router/private/property-owner-routes.ts';
import AdminRoutes from '@/router/private/admin-routes';
import { useUserStore } from '@/store/user';

// Consolidar rutas
const routes = [
  ...AuthRoutes,
  ...PublicRoutes,
  ...BackofficeRoutes,
  ...RenterRoutes,
  ...AgentRoutes,
  ...PropertyOwnerRoutes,
  ...AdminRoutes,
];

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard para proteger rutas de administrador
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAdminRoute = to.path.startsWith('/admin');
  
  console.log('Guard de navegación:', {
    to: to.path,
    isAdminRoute,
    isAuthenticated: userStore.isAuthenticated,
    isAdmin: userStore.isAdmin
  });
  
  // Si es una ruta de admin
  if (isAdminRoute) {
    // Verificar si el usuario está autenticado
    if (!userStore.isAuthenticated) {
      console.log('Usuario no autenticado, redirigiendo a login');
      next({ path: '/login' });
      return;
    }

    // Verificar si el usuario tiene rol de admin
    if (!userStore.isAdmin) {
      console.log('Usuario no es admin, redirigiendo a home');
      next({ path: '/' });
      return;
    }
  }

  next();
});

// Actualizar dinámicamente el título y las meta tags
router.afterEach((to) => {
  const metaTitle = to.meta?.metaTitle ? (i18n.global.t(to.meta.metaTitle as string) as string) : '';
  const metaDescription = to.meta?.metaDescription ? (i18n.global.t(to.meta.metaDescription as string) as string) : '';

  // Actualizar título de la página
  document.title = metaTitle;

  // Actualizar las meta tags
  const metaTitleTag = document.querySelector('meta[name="title"]') || createMetaTag('title');
  const metaDescriptionTag = document.querySelector('meta[name="description"]') || createMetaTag('description');

  metaTitleTag.setAttribute('content', metaTitle);
  metaDescriptionTag.setAttribute('content', metaDescription);
});

// Función auxiliar para crear meta tags si no existen
function createMetaTag(name: string): HTMLMetaElement {
  const metaTag = document.createElement('meta');
  metaTag.setAttribute('name', name);
  document.head.appendChild(metaTag);
  return metaTag;
}

export default router;
