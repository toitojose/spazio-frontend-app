export default [
  {
    path: '/cart',
    component: () => import('@/layout/Generic.vue'),
    children: [
      {
        path: 'cart-first-step',
        name: 'cart-first-step',
        component: () => import('@/ui/views/private/cart/CartFirstStep.vue'),
        meta: {
          metaTitle: 'renter.wantToRent.metaTitle',
          metaDescription: 'renter.wantToRent.metaDescription',
          title: 'renter.wantToRent.title',
          icon: 'pi pi-send',
        },
      },
    ],
  },
];
