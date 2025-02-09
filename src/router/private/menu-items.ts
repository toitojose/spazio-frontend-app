import AgentRoutes from './agent-routes';
import BackofficeRoutes from './backoffice-routes';
import RenterRoutes from './renter-routes';
import PropertyOwnerRoutes from './property-owner-routes';
import type { RouteRecordRaw } from 'vue-router';
import { RolesEnum } from '@/enums/roles.enum.ts';

// Función para crear el mapa de roles y rutas con nombres traducidos
export const createRoleRouteMap = (
  t: (key: string) => string,
): Record<RolesEnum, { name: string; routes: RouteRecordRaw[] }> => ({
  [RolesEnum.RENTER]: {
    name: t('renter.title'),
    routes: getChildrenFromRoutes(RenterRoutes),
  },
  [RolesEnum.AGENT]: {
    name: t('agent.title'),
    routes: getChildrenFromRoutes(AgentRoutes),
  },
  [RolesEnum.PROPERTY_AGENT]: {
    name: t('propertyOwner.title'),
    routes: getChildrenFromRoutes(PropertyOwnerRoutes),
  },
  [RolesEnum.ADMIN]: {
    name: t('backoffice.title'),
    routes: getChildrenFromRoutes(BackofficeRoutes),
  },
});

const getChildrenFromRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.flatMap((route) => {
    if (route.children) {
      return route.children.map((child) => ({
        ...child,
        path: `${route.path}/${child.path}`,
      }));
    }
    return route;
  });
};

// Función para obtener las rutas disponibles según los roles
export const getMenuItemsByRoles = (roles: string[], t: (key: string) => string) => {
  const roleRouteMap = createRoleRouteMap(t);

  // Filtrar roles válidos y mapear rutas
  const allRoutes = roles
    .filter((role): role is RolesEnum => role in roleRouteMap)
    .flatMap((role) => roleRouteMap[role].routes);

  // Evitar duplicados y traducir títulos
  return Array.from(
    new Map(
      allRoutes.map((route) => [
        route.path,
        {
          ...route,
          title: t((route.meta?.title as string) || 'Sin título'),
        },
      ]),
    ).values(),
  );
};
