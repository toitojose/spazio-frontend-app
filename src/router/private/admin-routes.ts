import Admin from '@/layout/admin/AdminLayout.vue';

export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'Admin-home',
        component: () => import('@/ui/views/private/admin/Home.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
        },
      },
      
      {
        path: 'products',
        name: 'Admin-products',
        component: () => import('@/ui/views/private/admin/Products.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
        },
      },
    ],
  },
];
