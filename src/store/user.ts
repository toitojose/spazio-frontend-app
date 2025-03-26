import { defineStore } from 'pinia';
import type { User } from '@/interfaces/User.interface.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '',
    entryMethod: null as 'internal' | 'external' | null,
    entryCode: null as string | null,
  }),
  actions: {
    setUser(user: Partial<User>, token?: string) {
      this.user = JSON.parse(JSON.stringify(user)) as User;
      if (token !== undefined) {
        this.token = token;
      }
      localStorage.setItem('tokenTimestamp', Date.now().toString());
    },
    clearUser() {
      this.user = null;
      this.token = '';
      this.entryMethod = null;
      this.entryCode = null;
    },
    setEntry(method: 'internal' | 'external', code: string | null = null) {
      this.entryMethod = method;
      this.entryCode = code;
    },
    isAdmin() {
      if (this.user?.roles) {
        for (let role of this.user.roles) {
          if (role.name === 'ADMIN') {
            return true;
          }
        }
      }
      return false;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    authToken: (state) => (state.token ? state.token : ''),
    userId: (state) => state.user?.id || null,
    userName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''),
    userFirstName: (state) => state.user?.firstName || '',
    userRoles: (state) => state.user?.roles?.map((role) => role.name) || [],
    hasRole: (state) => (roleName: string) => state.user?.roles?.some((role) => role.name === roleName),
    fullRoles: (state) => state.user?.roles || [],
    isExternalEntry: (state) => state.entryMethod === 'external',
    isInternalEntry: (state) => state.entryMethod === 'internal',
    codeEntry: (state) => state.entryCode,
  },
  persist: true,
});
