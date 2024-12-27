import type { RouteRecordRaw } from 'vue-router';

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login/not-available',
    name: 'not-available',
    component: () => import('@/ui/views/public/auth/NotAvailable.vue'),
  },
  {
    path: '/login/email-change',
    name: 'email-change',
    component: () => import('@/ui/views/public/auth/EmailChange.vue'),
  },
  {
    path: '/login/reset-password',
    name: 'reset-password',
    component: () => import('@/ui/views/public/auth/ResetPassword.vue'),
  },
  {
    path: '/login/restore-password',
    name: 'restore-password',
    component: () => import('@/ui/views/public/auth/RestorePassword.vue'),
  },
];

export default AuthRoutes;
