import AdminLayout from '@/layout/admin/AdminLayout.vue';

export default [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'products/create',
        name: 'Admin-products-create',
        component: () => import('@/ui/views/private/admin/products/Create.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.products.title',
          icon: 'pi pi-box',
        },
      },
    ],
  },
];
