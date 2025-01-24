import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user.interface.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '',
  }),
  actions: {
    setUser(user: Partial<User>, token?: string) {
      this.user = JSON.parse(JSON.stringify(user)) as User;
      if (token !== undefined) {
        this.token = token;
      }
    },
    clearUser() {
      this.user = null;
      this.token = '';
    },
  },
  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: (state) => !!state.user,

    // Obtén el nombre del usuario
    userName: (state) => (state.user ? `${state.user.firstname} ${state.user.lastname}` : ''),

    // Obtener el primer nombre del usuario
    userFirstName: (state) => state.user?.firstname || '',

    // Roles del usuario como lista de nombres
    userRoles: (state) => state.user?.roles?.map((role) => role.name) || [],

    // Verifica si el usuario tiene un rol específico
    hasRole: (state) => (roleName: string) => state.user?.roles?.some((role) => role.name === roleName),

    // Devuelve el objeto completo de los roles del usuario
    fullRoles: (state) => state.user?.roles || [],
  },
});
