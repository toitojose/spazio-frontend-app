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
      {
        path: 'products/edit/:id',
        name: 'Admin-products-edit',
        component: () => import('@/ui/views/private/admin/products/Edit.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.products.title',
          icon: 'pi pi-box',
        },
      },
      {
        path: 'catalogs/create',
        name: 'Admin-catalogs-create',
        component: () => import('@/ui/views/private/admin/catalogs/Create.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.products.title',
          icon: 'pi pi-box',
        },
      },
      {
        path: 'catalogs/edit/:id',
        name: 'Admin-catalogs-edit',
        component: () => import('@/ui/views/private/admin/catalogs/Edit.vue'),
        meta: {
          metaTitle: 'login.metaTitle',
          metaDescription: 'login.metaDescription',
          title: 'admin.products.title',
          icon: 'pi pi-box',
        },
      },
      {
        path: 'catalogs/edit/products/:id',
        name: 'Admin-catalogs-products-edit',
        component: () => import('@/ui/views/private/admin/catalogs/InsertProducts.vue'),
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
