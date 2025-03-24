import Admin from '@/layout/admin/AdminLayout.vue';

export default [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'Auth',
        component: () => import('@/ui/views/private/admin/Home.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
        },
      },
    ],
  },
];
