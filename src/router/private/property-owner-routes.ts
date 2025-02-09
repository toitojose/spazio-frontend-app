import type { RouteRecordRaw } from 'vue-router';

const PropertyOwnerRoutes: RouteRecordRaw[] = [
  {
    path: '/owner/want-to-rent',
    name: 'owner-want-to-rent',
    component: () => import('@/ui/views/private/propertyowner/WantToRent.vue'),
    meta: {
      metaTitle: 'owner.wantToRent.metaTitle',
      metaDescription: 'owner.wantToRent.metaDescription',
    },
  },
  {
    path: '/owner/my-properties',
    name: 'owner-my-properties',
    component: () => import('@/ui/views/private/propertyowner/MyProperties.vue'),
    meta: {
      metaTitle: 'owner.myProperties.metaTitle',
      metaDescription: 'owner.myProperties.metaDescription',
    },
  },
  {
    path: '/owner/opportunities',
    name: 'owner-opportunities',
    component: () => import('@/ui/views/private/propertyowner/Opportunities.vue'),
    meta: {
      metaTitle: 'owner.opportunities.metaTitle',
      metaDescription: 'owner.opportunities.metaDescription',
    },
  },
  {
    path: '/owner/income',
    name: 'owner-income',
    component: () => import('@/ui/views/private/propertyowner/Income.vue'),
    meta: {
      metaTitle: 'owner.income.metaTitle',
      metaDescription: 'owner.income.metaDescription',
    },
  },
];

export default PropertyOwnerRoutes;
