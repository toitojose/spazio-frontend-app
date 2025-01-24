import type { RouteRecordRaw } from 'vue-router';

const AgentRoutes: RouteRecordRaw[] = [
  {
    path: '/agent/properties',
    name: 'agent-properties',
    component: () => import('@/ui/views/private/agent/Properties.vue'),
    meta: {
      metaTitle: 'agent.properties.metaTitle',
      metaDescription: 'agent.properties.metaDescription',
      title: 'agent.properties.title',
      icon: 'pi pi-send',
    },
  },
  {
    path: '/agent/prospects',
    name: 'agent-prospects',
    component: () => import('@/ui/views/private/agent/Prospects.vue'),
    meta: {
      metaTitle: 'agent.prospects.metaTitle',
      metaDescription: 'agent.prospects.metaDescription',
      title: 'agent.prospects.title',
      icon: 'pi pi-users',
    },
  },
  {
    path: '/agent/contracts',
    name: 'agent-contracts',
    component: () => import('@/ui/views/private/agent/Contracts.vue'),
    meta: {
      metaTitle: 'agent.contracts.metaTitle',
      metaDescription: 'agent.contracts.metaDescription',
      title: 'agent.contracts.title',
      icon: 'pi pi-file-export',
    },
  },
];

export default AgentRoutes;
