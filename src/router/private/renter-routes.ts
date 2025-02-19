export default [
  {
    path: '/renter',
    component: () => import('@/layout/Generic.vue'),
    children: [
      {
        path: 'want-to-rent',
        name: 'renter-want-to-rent',
        component: () => import('@/ui/views/private/renter/wanttorent/WantToRent.vue'),
        meta: {
          metaTitle: 'renter.wantToRent.metaTitle',
          metaDescription: 'renter.wantToRent.metaDescription',
          title: 'renter.wantToRent.title',
          icon: 'pi pi-send',
        },
      },
      {
        path: 'identity-verification',
        name: 'renter-identity-verification',
        component: () => import('@/ui/views/private/renter/wanttorent/IdentityVerification.vue'),
        meta: {
          metaTitle: 'renter.identityVerification.metaTitle',
          metaDescription: 'renter.identityVerification.metaDescription',
          title: 'renter.identityVerification.title',
          icon: 'pi pi-id-card',
        },
      },
      {
        path: 'general-information',
        name: 'renter-general-information',
        component: () => import('@/ui/views/private/renter/wanttorent/GeneralInformation.vue'),
        meta: {
          metaTitle: 'renter.generalInformation.metaTitle',
          metaDescription: 'renter.generalInformation.metaDescription',
          title: 'renter.generalInformation.title',
          icon: 'pi pi-info-circle',
        },
      },
      {
        path: 'employment-information',
        name: 'renter-employment-information',
        component: () => import('@/ui/views/private/renter/wanttorent/EmploymentInformation.vue'),
        meta: {
          metaTitle: 'renter.employmentInformation.metaTitle',
          metaDescription: 'renter.employmentInformation.metaDescription',
          title: 'renter.employmentInformation.title',
          icon: 'pi pi-briefcase',
        },
      },
      {
        path: 'select-scenario',
        name: 'renter-scenario',
        component: () => import('@/ui/views/private/renter/wanttorent/SelectScenario.vue'),
        meta: {
          metaTitle: 'renter.matching.metaTitle',
          metaDescription: 'renter.matching.metaDescription',
          title: 'renter.matching.title',
          icon: 'pi pi-search',
        },
      },
      {
        path: 'connect-owner',
        name: 'renter-connect-owner',
        component: () => import('@/ui/views/private/renter/wanttorent/ConnectOwner.vue'),
        meta: {
          metaTitle: 'renter.connectOwner.metaTitle',
          metaDescription: 'renter.connectOwner.metaDescription',
          title: 'renter.connectOwner.title',
          icon: 'pi pi-link',
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
