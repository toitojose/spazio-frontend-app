import Generic from '@/layout/public/Generic.vue';

export default [
  {
    path: '/',
    component: Generic,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/ui/views/public/Home.vue'),
        meta: {
          title: 'default.title',
          metaTitle: 'default.metaTitle',
          metaDescription: 'default.metaDescription',
        },
      },
      {
        path: 'renter',
        name: 'renter',
        component: () => import('@/ui/views/public/Renter.vue'),
        meta: {
          metaTitle: 'renter.metaTitle',
          metaDescription: 'renter.metaDescription',
        },
      },
      {
        path: 'property-owner',
        name: 'property-owner',
        component: () => import('@/ui/views/public/PropertyOwner.vue'),
        meta: {
          metaTitle: 'propertyOwner.metaTitle',
          metaDescription: 'propertyOwner.metaDescription',
        },
      },
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/ui/views/public/Agent.vue'),
        meta: {
          metaTitle: 'agent.metaTitle',
          metaDescription: 'agent.metaDescription',
        },
      },
    ],
  },
];
