import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as { id: number; username: string } | null,
    token: '',
  }),
  actions: {
    setUser(user: { id: number; username: string; roles: { id: number; name: string }[] }, token: string) {
      this.user = user;
      this.token = token;
    },
    clearUser() {
      this.user = null;
      this.token = '';
    },
  },
});
