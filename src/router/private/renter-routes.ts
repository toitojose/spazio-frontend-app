export default [
  {
    path: '/renter',
    component: () => import('@/layout/Generic.vue'),
    children: [
      {
        path: 'want-to-rent',
        name: 'renter-want-to-rent',
        component: () => import('@/ui/views/private/renter/WantToRent.vue'),
        meta: {
          metaTitle: 'renter.wantToRent.metaTitle',
          metaDescription: 'renter.wantToRent.metaDescription',
          title: 'renter.wantToRent.title',
          icon: 'pi pi-send',
        },
      },
      {
        path: 'my-rentals',
        name: 'renter-my-rentals',
        component: () => import('@/ui/views/private/renter/MyRentals.vue'),
        meta: {
          metaTitle: 'renter.myRentals.metaTitle',
          metaDescription: 'renter.myRentals.metaDescription',
          title: 'renter.myRentals.title',
          icon: 'pi pi-key',
        },
      },
      {
        path: 'opportunities',
        name: 'renter-opportunities',
        component: () => import('@/ui/views/private/renter/Opportunities.vue'),
        meta: {
          metaTitle: 'renter.opportunities.metaTitle',
          metaDescription: 'renter.opportunities.metaDescription',
          title: 'renter.opportunities.title',
          icon: 'pi pi-briefcase',
        },
      },
      {
        path: 'payments',
        name: 'renter-payments',
        component: () => import('@/ui/views/private/renter/Payments.vue'),
        meta: {
          metaTitle: 'renter.payments.metaTitle',
          metaDescription: 'renter.payments.metaDescription',
          title: 'renter.payments.title',
          icon: 'pi pi-wallet',
        },
      },
      {
        path: 'profile',
        name: 'renter-profile',
        component: () => import('@/ui/views/private/renter/Profile.vue'),
        meta: {
          metaTitle: 'renter.profile.metaTitle',
          metaDescription: 'renter.profile.metaDescription',
          title: 'renter.profile.title',
          icon: 'pi pi-id-card',
        },
      },
    ],
  },
];
