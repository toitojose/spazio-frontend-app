import type { RouteRecordRaw } from 'vue-router';

const BackofficeRoutes: RouteRecordRaw[] = [
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/ui/views/private/Welcome.vue'),
    meta: {
      metaTitle: 'dashboard.metaTitle',
      metaDescription: 'dashboard.metaDescription',
    },
  },
];

export default BackofficeRoutes;
