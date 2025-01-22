import type { RouteRecordRaw } from 'vue-router';

const RenterRoutes: RouteRecordRaw[] = [
  {
    path: '/renter/want-to-rent',
    name: 'renter-want-to-rent',
    component: () => import('@/ui/views/private/renter/WantToRent.vue'),
    meta: {
      metaTitle: 'renter.wantToRent.metaTitle',
      metaDescription: 'renter.wantToRent.metaDescription',
    },
  },
  {
    path: '/renter/my-rentals',
    name: 'renter-my-rentals',
    component: () => import('@/ui/views/private/renter/MyRentals.vue'),
    meta: {
      metaTitle: 'renter.myRentals.metaTitle',
      metaDescription: 'renter.myRentals.metaDescription',
    },
  },
  {
    path: '/renter/opportunities',
    name: 'renter-opportunities',
    component: () => import('@/ui/views/private/renter/Opportunities.vue'),
    meta: {
      metaTitle: 'renter.opportunities.metaTitle',
      metaDescription: 'renter.opportunities.metaDescription',
    },
  },
  {
    path: '/renter/payments',
    name: 'renter-payments',
    component: () => import('@/ui/views/private/renter/Payments.vue'),
    meta: {
      metaTitle: 'renter.payments.metaTitle',
      metaDescription: 'renter.payments.metaDescription',
    },
  },
  {
    path: '/renter/personal-info',
    name: 'renter-personal-info',
    component: () => import('@/ui/views/private/renter/PersonalInfo.vue'),
    meta: {
      metaTitle: 'renter.personalInfo.metaTitle',
      metaDescription: 'renter.personalInfo.metaDescription',
    },
  },
];

export default RenterRoutes;
