import type { RouteRecordRaw } from 'vue-router';

const BackofficeRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/ui/views/private/Dashboard.vue'),
    meta: {
      metaTitle: 'dashboard.metaTitle',
      metaDescription: 'dashboard.metaDescription',
    },
  },
];

export default BackofficeRoutes;
