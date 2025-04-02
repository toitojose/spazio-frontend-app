import AdminLayout from '@/layout/admin/AdminLayout.vue';

export default [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'Admin-home',
        component: () => import('@/ui/views/private/admin/Home.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.title',
          icon: 'pi pi-home',
        },
      },
      {
        path: 'products',
        name: 'Admin-products',
        component: () => import('@/ui/views/private/admin/products/Index.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.products.title',
          icon: 'pi pi-box',
        },
      },
      {
        path: 'catalogs',
        name: 'Admin-catalogs',
        component: () => import('@/ui/views/private/admin/catalogs/Index.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.catalogs.title',
          icon: 'pi pi-book',
        },
      },
    ],
  },
];
