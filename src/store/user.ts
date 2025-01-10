import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user.interface.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '',
  }),
  actions: {
    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
    },
    clearUser() {
      this.user = null;
      this.token = '';
    },
  },
});
