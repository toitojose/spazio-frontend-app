import type { RouteRecordRaw } from 'vue-router';

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/ui/views/public/auth/Login.vue'),
    meta: {
      metaTitle: 'login.metaTitle',
      metaDescription: 'login.metaDescription',
    },
  },
  {
    path: '/login/not-available',
    name: 'not-available',
    component: () => import('@/ui/views/public/auth/NotAvailable.vue'),
    meta: {
      metaTitle: 'notAvaliable.metaTitle',
      metaDescription: 'notAvaliable.metaDescription',
    },
  },
  {
    path: '/login/email-change',
    name: 'email-change',
    component: () => import('@/ui/views/public/auth/EmailChange.vue'),
    meta: {
      metaTitle: 'emailChange.metaTitle',
      metaDescription: 'emailChange.metaDescription',
    },
  },
  {
    path: '/login/reset-password',
    name: 'reset-password',
    component: () => import('@/ui/views/public/auth/ResetPassword.vue'),
    meta: {
      metaTitle: 'resetPassword.metaTitle',
      metaDescription: 'resetPassword.metaDescription',
    },
  },
  {
    path: '/login/restore-password',
    name: 'restore-password',
    component: () => import('@/ui/views/public/auth/RestorePassword.vue'),
    meta: {
      metaTitle: 'restorePassword.metaTitle',
      metaDescription: 'restorePassword.metaDescription',
    },
  },
];

export default AuthRoutes;
