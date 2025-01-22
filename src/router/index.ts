import { createRouter, createWebHistory } from 'vue-router';
import AuthRoutes from '@/router/public/auth-routes';
import BackofficeRoutes from '@/router/private/backoffice-routes.ts';
import { i18n } from '@/locales/i18n';
import PublicRoutes from '@/router/public/public-routes.ts';
import renterRoutes from '@/router/private/renter-routes.ts';
import AgentRoutes from '@/router/private/agent-routes.ts';
import PropertyOwnerRoutes from '@/router/private/property-owner-routes.ts';

const home = [
  {
    path: '',
    name: 'home',
    component: () => import('@/ui/views/public/Home.vue'),
    meta: {
      title: 'default.title',
      metaTitle: 'default.metaTitle',
      metaDescription: 'default.metaDescription',
    },
  },
];
// Consolidar rutas
const routes = [
  ...home,
  ...AuthRoutes,
  ...PublicRoutes,
  ...BackofficeRoutes,
  ...renterRoutes,
  ...AgentRoutes,
  ...PropertyOwnerRoutes,
];

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Si se guarda la posición (retroceder/avanzar), úsala
    if (savedPosition) {
      return savedPosition;
    }
    // Si hay un hash, desplázate al elemento correspondiente
    else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // De lo contrario, desplázate al inicio de la página
    else {
      return { top: 0, behavior: 'smooth' };
    }
  },
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
